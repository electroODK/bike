import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import  User  from "../models/user.js"

dotenv.config();

// register controller
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    console.log(name, email, password, mobile);

    
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({
        message: 'Please fill the required fields',
        error: true,
        success: false,
      });
    }

    
      const existingUser = await User.findOne({ where: {
    [User.sequalize.Op.or]: [{ email }, { mobile }],
  },
});

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.email === email
            ? 'Email is already registered'
            : 'Mobile number is already registered',
        error: true,
        success: false,
      });
    }

    
    const hashedPassword = await hashPassword(password);

    
    const newUser = new UserModel({
      username: name,
      email,
      password: hashedPassword,
      mobile,
    });

    const savedUser = await newUser.save();

    
    const verifyEmailURL = `${process.env.CLIENT_URL}/verify-email?code=${savedUser._id}`;

   
    await sendEmail({
      sendTo: email,
      subject: 'Verification Email from Blinkit',
      html: verificationEmailTemplate({
        name: savedUser.username, 
        url: verifyEmailURL,
      }),
    });

    
    const accessToken = await generateAccessToken(savedUser._id);
    const refreshToken = await generateRefreshToken(savedUser._id);

    const cookiesOption = {
      httpOnly: true,
      secure: false, 
      sameSite: 'None',
    };

    
    res.cookie('accessToken', accessToken, cookiesOption);
    res.cookie('refreshToken', refreshToken, cookiesOption);

    return res.status(201).json({
      message: 'User registered successfully',
      error: false,
      success: true,
      data: {
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          mobile: savedUser.mobile,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
      error: true,
      success: false,
    });
  }
};

// verify user
export const verifyUserController = async (req, res) => {
  try {
    const { code } = req.body;

   const user = await User.findOne({ where: { verificationCode: code } });

    if (!user) {
      return res.status(400).json({
        message: "Invalid verification code",
        error: true,
        success: false,
      });
    }

    if (user.verify_email) {
      return res.status(400).json({
        message: "User already verified",
        error: true,
        success: false,
      });
    }

    user.verify_email = true;
    user.verificationCode = null;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// login user
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        error: true,
        success: false,
      });
    }

    
    const user = await User.findOne({ where: { email }, });

    if (!user) {
      return res.status(401).json({ 
        message: "Invalid credentials", 
        error: true,
        success: false,
      });
    }

    
    if (user.status !== "Active") {
      return res.status(403).json({ 
        message: "Your account is ${user.status}. Please contact support.",
        error: true,
        success: false,
      });
    }

   
    const isPasswordMatch = await comparePasswords(password, user.password);
    
    if (!isPasswordMatch) {
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      return res.status(401).json({
        message: "Invalid credentials",
        error: true,
        success: false,
      });
    }

    
    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    
    await UserModel.findByIdAndUpdate(
      user._id,
      { last_login_date: new Date() },
      { new: true }
    );

    
    const cookiesOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    };

    res.cookie("accessToken", accessToken, cookiesOptions);
    res.cookie("refreshToken", refreshToken, cookiesOptions);

    
    const userResponse = {
      _id: user._id,
      email: user.email,
      username: user.username,
      status: user.status,
      last_login_date: user.last_login_date,
    };

    return res.status(200).json({
      message: "Login successful",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: userResponse, 
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};

// Log Out
export const logoutUserController = async (req, res) => {
  try {
    const userId = req.userId;

    const cookiesOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOptions);
    res.clearCookie("refreshToken", cookiesOptions);

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    await user.update({ refresh_token: ''})

    return res.status(200).json({
      message: "Logged out successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// forgotPassword
export const forgotPasswordController = async (req, res) => {
  try {
    const email = req.body.email?.trim();

    if (!email) {
      return res.status(400).json({
        message: "Please provide email",
        error: true,
        success: false,
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "Email does not exist",
        error: true,
        success: false,
      });
    }

    const otp = generateOTP(); 
    const otpExpireTime = new Date(Date.now() + 10 * 60 * 1000);

    await user.update({
      forgot_password_otp: otp,
      forgot_password_expiry: otpExpireTime,
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot Password from Blinkin Shop",
      html: forgotPasswordEmailTemplate({
        name: user.name,
        otp,
      }),
    });

    return res.status(200).json({
      message: "Check your email",
      error: false,
      success: true, 
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      error: true,
      success: false,
    });
  }
};

//verify forgot password OTP
export const verifyForgotPasswordOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Please provide both Email and OTP",
        error: true,
        success: false,
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "Email does not exist!",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date();

    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        message: "The OTP has expired. Please request a new one to proceed",
        error: true,
        success: false,
      });
    }

    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        message: "The OTP entered is incorrect. Please check and try again",
        error: true,
        success: false,
      });
    }

   
    await user.update({
      $set: {
        forgot_password_otp: null,
        forgot_password_expiry: null,
      },
    });

    return res.status(200).json({
      message: "OTP verified successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//reset password
export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email,  !newPassword, !confirmPassword) {
      return res.status(400).json({
        message: "Please provide email and both password fields.",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match! Please ensure both fields are identical.",
        error: true,
        success: false,
      });
    }

   const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "Email does not exist",
        error: true,
        success: false,
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    await user.update({
      password: hashedPassword,
      forgot_password_otp: null,
      forgot_password_expiry: null,
    });

    await sendEmail({
      sendTo: email,
      subject: "Your Password Has Been Successfully Reset",
      html: resetPasswordConfirmationTemplate({
        name: updatedUser.name,
        email: updatedUser.email,
        supportEmail: '',
      }),
    });

    return res.status(200).json({
      message: "Password updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// refresh token controller
export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req.headers.authorization?.split(' ')[1];

    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token not found",
        error: true,
        success: false,
      });
    }

    
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);

    const user = await User.findByPk(decoded.id);

    if (!user || user.refresh_token !== refreshToken) {
      return res.status(401).json({
        message: "Invalid or expired refresh token",
        error: true,
        success: false,
      });
    }

    
    const newAccessToken = await generateAccessToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookieOptions);

    return res.status(200).json({
      message: "New accessToken generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
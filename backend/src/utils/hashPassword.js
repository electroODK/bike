import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// хэширование пароля
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

// сравнение пароля с хэшем
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const generateOTP = () => {
    return Math.floor(Math.random() * 900000) + 100000 
}

console.log(generateOTP());


export default generateOTPsd
const userVerifyOtpService = async ({ email, otp }, OTPModel) => {
  try {

    const otpRecord = await OTPModel.findOne({
      email,
      otp: otp.toString(),
      status: 0
    }).sort({ createdDate: -1 }); 

    if (!otpRecord) {
      return {
        statusCode: 400, 
        status: "fail",
        message: "Invalid OTP"
      };
    }

    otpRecord.status = 1;
    await otpRecord.save();

    return {
      statusCode: 200,    
      status: "success",
      message: "OTP verified successfully"
    };
  } catch (error) {
    return {
      statusCode: 500,  
      status: "error",
      message: error.message
    };
  }
};

export default userVerifyOtpService;

import OTPModel from "../../models/Users/otp.model.js";
import SendEmailUtility from "../../utility/SendEmailUtility.js";

const userVerifyEmailService = async (req, UserModel) => {
  try {
    const email = req.params.email;
    const OTPCode = Math.floor(1000 + Math.random() * 9000).toString();

    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      return { status: "fail", message: "User not found" };
    }

    await OTPModel.updateMany({ email, status: 0 }, { status: 2 });

    await OTPModel.create({ email, otp: OTPCode, status: 0 });

    await SendEmailUtility(
      email,
      `Your PIN code is ${OTPCode}`,
      "Inventory Verification"
    );

    return { status: "success", message: "OTP sent successfully" };

  } catch (error) {
    return { status: "error", message: error.message };
  }
};

export default userVerifyEmailService;

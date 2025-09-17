import OTPModel from "../../models/Users/otp.model.js";

const userResetPasswordService = async (req, UserModel) => {
    const { email, OTP: OTPCode, password: NewPass } = req.body;

    try {
        const otpRecord = await OTPModel.findOne({ email, otp: OTPCode, status: 0 });
        if (!otpRecord) {
            return {
                statusCode: 400,
                status: "fail",
                message: "Expired or invalid OTP"
            };
        }

        await UserModel.updateOne(
            { email },
            { $set: { password: NewPass } }
        );

        await OTPModel.findByIdAndUpdate(otpRecord._id, { status: 1 });

        return {
            statusCode: 200,
            status: "success",
            message: "Password updated successfully"
        };

    } catch (error) {
        console.error(error);
        return { statusCode: 500, status: "fail", message: error.message };
    }
};

export default userResetPasswordService;

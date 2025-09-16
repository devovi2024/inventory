const OTPModel = require("../../models/OTPModel");

const userResetPasswordService = async (Request, DataModel) => {
    const email = Request.body['email'];
    const OTPCode = Request.body['OTP'];
    const NewPass = Request.body['password'];
    const statusUpdate = 1;

    try {
        const OTPUsedCount = await OTPModel.aggregate([
            { $match: { email: email, otp: OTPCode, status: 0 } }
        ]);

        if (OTPUsedCount.length > 0) {
            const passwordUpdate = await DataModel.updateOne(
                { email: email },
                { $set: { password: NewPass } }
            );

            await OTPModel.updateOne(
                { email: email, otp: OTPCode },
                { $set: { status: statusUpdate } }
            );

            return {
                statusCode: 200,
                status: "success",
                message: "Password updated successfully",
                data: passwordUpdate
            };
        } else {
            return { statusCode: 400, status: "fail", message: "expired OTP" };
        }
    } catch (error) {
        console.error(error);
        return { statusCode: 500, status: "fail", message: error.toString() };
    }
};

module.exports = userResetPasswordService;

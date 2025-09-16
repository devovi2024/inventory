const userVerifyOtpService = async (Request, DataModel) => {
    try {
        const email = Request.body.email;
        const OTPCode = Request.body.otp;
        const statusUpdate = 1;
        let status = 0;

        const OTPCount = await DataModel.aggregate([
            { $match: { email: email, otp: OTPCode, status: 0 } },
            { $count: "total" }
        ]);

        if (OTPCount.length > 0) {
            const OTPUpdate = await DataModel.updateOne(
                { email: email, otp: OTPCode },
                { $set: { status: statusUpdate } }
            );

            status = 1;
            return { status, message: "OTP verified successfully", data: OTPUpdate };
        } else {
            return { status, message: "Invalid OTP" };
        }

    } catch (error) {
        return { status: 0, message: error.message };
    }
};

export default userVerifyOtpService;

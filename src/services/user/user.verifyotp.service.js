const userVerifyOtpService = async (req, OTPModel) => {
    try {
        const { email, otp } = req.body;
        const statusUpdate = 1;
        let status = 0;

        const otpRecord = await OTPModel.findOne({ email, otp, status: 0 });

        if (otpRecord) {
            await OTPModel.updateOne(
                { _id: otpRecord._id },
                { $set: { status: statusUpdate } }
            );

            status = 1;
            return { status, message: "OTP verified successfully" };
        } else {
            return { status, message: "Invalid OTP" };
        }

    } catch (error) {
        return { status: 0, message: error.message };
    }
};

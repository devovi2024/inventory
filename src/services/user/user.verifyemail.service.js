const OTPModel = require('../../models/OTPModel'); 
const SendEmailUtility = require('../../utility/SendEmailUtility');

const userVerifyEmailService = async (Request, DataModel) => {
    try {
        let email = Request.params.email;
        let OTPCode = Math.floor(1000 + Math.random() * 9000);

        let UserCount = await DataModel.aggregate([
            { $match: { email: email } },
            { $count: "total" }
        ]);

        if (UserCount.length > 0) {
            await OTPModel.create({ email: email, otp: OTPCode });
            let SendEmail = await SendEmailUtility(email, "Your PIN code is " + OTPCode, "Inventory");
            return { status: "success", data: SendEmail };
        } else {
            return { status: "fail", message: "User not found" };
        }
    } catch (error) {
        return { status: "error", message: error.message };
    }
};

export default userVerifyEmailService;

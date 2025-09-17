import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    status: { type: Number, default: 0 },
    createdDate: { type: Date, default: Date.now }
}, { versionKey: false });

const OTPModel = mongoose.model("OTP", OTPSchema);

export default OTPModel;

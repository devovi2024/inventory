import mongoose from "mongoose";

const ReturnSchema = new mongoose.Schema({
    UserEmail: { type: String, required: true },
    CustomerID: { type: mongoose.Schema.Types.ObjectId, ref: "customers", required: true },
    Reason: { type: String, default: "" },
    TotalAmount: { type: Number, default: 0 },
    Note: { type: String, default: "" },
    CreateDate: { type: Date, default: Date.now }
}, { versionKey: false });

const ReturnModel = mongoose.model("returns", ReturnSchema);
export default ReturnModel;

import mongoose from "mongoose";

const ReturnProductSchema = new mongoose.Schema({
    UserEmail: { type: String },
    ReturnID: { type: mongoose.Schema.Types.ObjectId, ref: "returns" },
    ProductID: { type: mongoose.Schema.Types.ObjectId },
    Qty: { type: Number },
    RefundAmount: { type: Number },
    Note: { type: String },
    CreateDate: { type: Date, default: Date.now }
}, { versionKey: false });

const ReturnProductModel = mongoose.model("return_products", ReturnProductSchema);
export default ReturnProductModel;

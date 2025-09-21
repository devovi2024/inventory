import mongoose from "mongoose";

const SalesProductSchema = new mongoose.Schema({
    UserEmail: { type: String },
    SalesID: { type: mongoose.Schema.Types.ObjectId, ref: "sales" },
    ProductID: { type: mongoose.Schema.Types.ObjectId },
    Qty: { type: Number },
    UnitPrice: { type: Number },
    Total: { type: Number },
    Note: { type: String },
    CreateDate: { type: Date, default: Date.now }
}, { versionKey: false });

const SalesProductModel = mongoose.model("sales_products", SalesProductSchema);
export default SalesProductModel;

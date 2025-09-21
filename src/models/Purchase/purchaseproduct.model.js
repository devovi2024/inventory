import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    UserEmail: { type: String },
    PurchaseID: { type: mongoose.Schema.Types.ObjectId },
    ProductID: { type: mongoose.Schema.Types.ObjectId },
    Qty: { type: Number },
    UnitCost: { type: Number },
    Total: { type: Number },
    Note: { type: String },
    CreateDate: { type: Date }
}, { versionKey: false });

const PurchaseProductModel = mongoose.model("purchase_products", DataSchema);

export default PurchaseProductModel;

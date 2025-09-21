import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    UserEmail: { type: String, required: true },
    SupplierID: { type: mongoose.Schema.Types.ObjectId, ref: "suppliers", required: true },
    VatTax: { type: Number, default: 0 },
    Discount: { type: Number, default: 0 },
    OtherCost: { type: Number, default: 0 },
    ShippingCost: { type: Number, default: 0 },
    GrandTotal: { type: Number, default: 0 },
    Note: { type: String, default: "" },
    CreateDate: { type: Date, default: Date.now }
}, { versionKey: false });

const PurchaseModel = mongoose.model("purchases", DataSchema);

export default PurchaseModel;

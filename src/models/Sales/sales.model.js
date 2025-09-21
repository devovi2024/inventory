import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema({
    UserEmail: { type: String, required: true },
    CustomerID: { type: mongoose.Schema.Types.ObjectId, ref: "customers", required: true },
    VatTax: { type: Number, default: 0 },
    Discount: { type: Number, default: 0 },
    OtherCost: { type: Number, default: 0 },
    ShippingCost: { type: Number, default: 0 },
    GrandTotal: { type: Number, default: 0 },
    Note: { type: String, default: "" },
    CreateDate: { type: Date, default: Date.now }
}, { versionKey: false });

const SalesModel = mongoose.model("sales", SalesSchema);
export default SalesModel;

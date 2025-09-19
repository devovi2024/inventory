import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    UserEmail: { type: String },
    SupplierName: { type: String },
    Phone: { type: String },
    Email: { type: String, unique: true },
    Address: { type: String },
    CreateDate: { type: Date, default: Date.now }
}, { versionKey: false });

const SuppliersModel = mongoose.model("suppliers", DataSchema);

export default SuppliersModel;

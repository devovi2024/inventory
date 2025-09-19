import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    UserEmail: { type: String },
    CustomerName: { type: String },
    Phone: { type: String },
    Email: { type: String, unique: true },
    Address: { type: String },
    CreateDate: { type: Date, default: Date.now }
}, { versionKey: false });

const CustomersModel = mongoose.model("customers", DataSchema);

export default CustomersModel;

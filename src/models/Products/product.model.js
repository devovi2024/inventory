import mongoose from "mongoose"; 
const DataSchema = new mongoose.Schema({
    UserEmail: { type: String },
    CategoryID: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    BrandID: { type: mongoose.Schema.Types.ObjectId, ref: "brands" },
    Name: { type: String, unique: true },
    Unit: { type: String },
    Details: { type: String },
    CreateDate: { type: Date, default: Date.now }
}, { versionKey: false });

const ProductModel = mongoose.model("products", DataSchema);

export default ProductModel; 
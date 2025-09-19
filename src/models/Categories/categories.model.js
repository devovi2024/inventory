import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema({
    UserEmail: { type: String },
    Name: { type: String, unique: true },
    CreateDate: { type: Date, default: Date.now }
}, { versionKey: false });

const CategoriesModel = mongoose.model("categories", CategoriesSchema);

export default CategoriesModel;  

import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    UserEmail: { type: String, required: true },
    Name: { type: String, unique: true, required: true },
    CreateDate: { type: Date, default: Date.now }
}, { versionKey: false });

const BrandsModel = mongoose.model('brands', DataSchema);
export default BrandsModel;

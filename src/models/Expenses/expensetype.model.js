import mongoose from "mongoose";

const ExpenseTypeSchema = new mongoose.Schema({
    UserEmail: { type: String },
    Name: { type: String, unique: true },
    CreateDate: { type: Date, default: Date.now }
}, { versionKey: false });

const ExpenseTypeModel = mongoose.model("expensetypes", ExpenseTypeSchema);

export default ExpenseTypeModel;

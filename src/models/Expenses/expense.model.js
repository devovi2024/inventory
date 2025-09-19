import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    UserEmail: { type: String },
    ExpenseTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "expensetypes", required: true },
    Amount: { type: Number, required: true },
    Note: { type: String },
    Date: { type: Date, default: Date.now },
    CreateDate: { type: Date, default: Date.now }
}, { versionKey: false });

const ExpenseModel = mongoose.model("expenses", ExpenseSchema);

export default ExpenseModel;

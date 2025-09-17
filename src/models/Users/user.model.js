import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    mobile: { type: String },
    password: { type: String, required: true },
    photo: { type: String },
    createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;

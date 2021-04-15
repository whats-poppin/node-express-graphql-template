import mongoose from "mongoose";
// import uniqueValidator from 'mongoose-unique-validator';
import { IUser } from "../interfaces/user-interface";

const UserSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    profileUrl: { type: String },
});

// UserSchema.plugin(uniqueValidator);

export default mongoose.model<IUser>("User", UserSchema);

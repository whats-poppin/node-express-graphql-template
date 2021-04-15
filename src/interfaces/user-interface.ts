import { Document } from "mongoose";

export interface IUser extends Document {
    id: string,
    name: string,
    phone: string,
    email: string,
    password: string,
    following: Array<IUser["_id"]>,
    followers: Array<IUser["_id"]>,
    profileUrl: string
}

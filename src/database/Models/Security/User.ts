import mongoose from "mongoose";

export interface User {
    username: string;
    password: string;
    permissions: number;
}

export default mongoose.model<User & mongoose.Document>("User", new mongoose.Schema<User & mongoose.Document>({
    username: { type: String },
    password: { type: String },
    permissions: { type: Number }
}));
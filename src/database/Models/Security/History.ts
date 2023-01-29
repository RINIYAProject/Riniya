import mongoose from "mongoose";

export interface History {
    userId: string;
    accessToken: string;
    clientToken: string;
    createdAt: number;
}

export default mongoose.model<History & mongoose.Document>("History", new mongoose.Schema<History & mongoose.Document>({
    userId: { type: String },
    accessToken: { type: String },
    clientToken: { type: String },
    createdAt: { type: Number }
}));
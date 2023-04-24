import mongoose from "mongoose";

export interface Invalidated {
    userId: string;
    accessToken: string;
    clientToken: string;
}

export default mongoose.model<Invalidated & mongoose.Document>("Invalidated", new mongoose.Schema<Invalidated & mongoose.Document>({
    userId: { type: String },
    accessToken: { type: String },
    clientToken: { type: String }
}));
import mongoose from "mongoose";

export interface Session {
    userId: string;

    accessToken: string;
    clientToken: string;

    sessionExpiry: number;
    sessionExpired: boolean;
}

export default mongoose.model<Session & mongoose.Document>("Session", new mongoose.Schema<Session & mongoose.Document>({
    userId: { type: String },

    accessToken: { type: String },
    clientToken: { type: String },

    sessionExpiry: { type: Number },
    sessionExpired: { type: Boolean },
}));
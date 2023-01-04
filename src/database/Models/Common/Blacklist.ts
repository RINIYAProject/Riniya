import mongoose from "mongoose";

export interface Blacklist {
    userId: string;
    caseId: string;
    reason: string;
    issuedBy: string;
    registeredAt: number;
}

export default mongoose.model<Blacklist & mongoose.Document>("Blacklist", new mongoose.Schema<Blacklist & mongoose.Document>({
    userId: { type: String },
    caseId: { type: String },
    reason: { type: String },
    issuedBy: { type: String },
    registeredAt: { type: Number, default: new Date().getTime() }
}));
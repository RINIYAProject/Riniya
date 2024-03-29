import mongoose from "mongoose";

export interface IBlacklist {
    userId: string;
    caseId: string;
    reason: string;
    issuedBy: string;
    registeredAt: number;
}

export default mongoose.model<IBlacklist & mongoose.Document>("Blacklist", new mongoose.Schema<IBlacklist & mongoose.Document>({
    userId: { type: String },
    caseId: { type: String },
    reason: { type: String },
    issuedBy: { type: String },
    registeredAt: { type: Number, default: new Date().getTime() }
}));
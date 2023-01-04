import mongoose from "mongoose";

export interface Sanction {
    guildId: string;
    memberId: string;
    type: string | 'ban' | 'kick' | 'warn' | 'mute';
    reason: string;
    issuedBy: string;
    registeredAt: number;
}

export default mongoose.model<Sanction & mongoose.Document>("Sanction", new mongoose.Schema<Sanction & mongoose.Document>({
    guildId: { type: String },
    memberId: { type: String },
    type: { type: String },
    reason: { type: String },
    issuedBy: { type: String },
    registeredAt: { type: Number, default: new Date().getTime() }
}));
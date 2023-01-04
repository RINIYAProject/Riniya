import mongoose from "mongoose";

export interface Appeal {
    guildId?: string;
    memberId?: string;
    status?: string | 'pending' | 'reduced' | 'removed' | 'reject' | 'timedout';
}

export default mongoose.model<Appeal & mongoose.Document>("Appeal", new mongoose.Schema<Appeal & mongoose.Document>({
    guildId: { type: String },
    memberId: { type: String },
    status: { type: String, default: 'pending' }
}));
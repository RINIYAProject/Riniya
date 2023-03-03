import mongoose from "mongoose";

export interface File {
    guildId: string;
    userId: string;
    fileId?: string;
    extension: string;
    private: boolean;
    deleted: boolean;
    registeredAt: number;
}

export default mongoose.model<File & mongoose.Document>("File", new mongoose.Schema<File & mongoose.Document>({
    guildId: { type: String },
    userId: { type: String },
    fileId: { type: String },
    extension: { type: String },
    private: { type: Boolean },
    deleted: { type: Boolean, default: false },
    registeredAt: { type: Number, default: Date.now() }
}));
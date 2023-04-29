import mongoose from "mongoose";

export declare type IBan = {
    reason: string;
    issuer: string;
    active: boolean;
    registeredAt: number;
}

export declare type IPermissions = {
    permissions?: Array<String>
}

export interface User {
    username: string;
    password: string;
    metadata: IPermissions;
    discordId: string;
    banned?: IBan;
}

export default mongoose.model<User & mongoose.Document>("User", new mongoose.Schema<User & mongoose.Document>({
    username: { type: String, unique: true },
    password: { type: String },
    discordId: { type: String, unique: true },
    metadata: { type: Object },
    banned: { type: Object }
}));
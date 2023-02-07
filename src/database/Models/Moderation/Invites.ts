import mongoose from "mongoose";

export interface Invites {
    guildId?: string;
    inviteCode?: string;
}

export default mongoose.model<Invites & mongoose.Document>("Invite", new mongoose.Schema<Invites & mongoose.Document>({
    guildId: { type: String },
    inviteCode: { type: String }
}));
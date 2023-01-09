import * as mongoose from "mongoose";

export interface Role {
    roleId?: string;
    guildId?: string;
    type?: string;
    description?: string;
    emoji?: string;
    selfAssignable?: boolean;
}

export default mongoose.model<Role & mongoose.Document>("Role", new mongoose.Schema<Role & mongoose.Document>({
    roleId: { type: String, required: true },
    guildId: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, maxlength: 100 },
    emoji: { type: String },
    selfAssignable: { type: Boolean },
}));
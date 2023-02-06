import mongoose from "mongoose";

export interface Blocklist {
    twitterId: string;
}

export default mongoose.model<Blocklist & mongoose.Document>("Blocklist", new mongoose.Schema<Blocklist & mongoose.Document>({
    twitterId: { type: String }
}));
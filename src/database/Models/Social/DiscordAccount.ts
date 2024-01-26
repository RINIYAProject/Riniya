import mongoose from "mongoose";
import { OAuthToken } from '../../../api/website/utils/Discord'

export interface DiscordAccount {
  userId: string;
  email: string;
  username: string;
  tokens: OAuthToken;
  uuid: string;
}

export default mongoose.model<DiscordAccount & mongoose.Document>("DiscordAccounts", new mongoose.Schema<DiscordAccount & mongoose.Document>({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, default: "No consent." },
  username: { type: String, required: true },
  tokens: { type: Object, required: true },
  uuid: { type: String, unique: true, default: "" },
}));

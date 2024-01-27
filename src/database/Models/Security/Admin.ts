import mongoose from "mongoose";

export interface Admin {
  userId: string;
  email: string;
  password: string;
  requireMFA: boolean;
  mfaChallenge?: string;
}

export default mongoose.model<Admin & mongoose.Document>("Admin", new mongoose.Schema<Admin & mongoose.Document>({
  userId: { type: String },
  email: { type: String },
  password: { type: String },
  requireMFA: { type: Boolean, default: false },
  mfaChallenge: { type: String },
}));

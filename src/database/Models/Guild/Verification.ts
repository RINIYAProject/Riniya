/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Verification.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 23:34:39 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 23:41:24 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import mongoose from "mongoose";

export interface Verification {
    guildId: string;
    memberId: string;
    issuer: string | 'pending';
    status: string | 'pending' | 'verified' | 'denied' | 'timedout';
    registeredAt: number;
    updatedAt: number;
    expireAt: number;
}

export default mongoose.model<Verification & mongoose.Document>("Verification", new mongoose.Schema<Verification & mongoose.Document>({
    guildId: { type: String },
    memberId: { type: String },
    issuer: { type: String, default: 'pending' },
    status: { type: String, default: 'pending' },
    registeredAt: { type: Number },
    updatedAt: { type: Number },
    expireAt: { type: Number }
}));

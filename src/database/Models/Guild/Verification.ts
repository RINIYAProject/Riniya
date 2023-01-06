/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Verification.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 23:34:39 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 05:46:37 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import mongoose from "mongoose";

export interface Verification {
    guildId: string;
    memberId: string;
    memberName: string;
    issuerId: string | 'pending';
    issuerName: string | 'pending';
    status: string | 'pending' | 'verified' | 'denied' | 'timedout';
    answers: Object;
    registeredAt: number;
    updatedAt: number;
    expireAt: number;
}

export default mongoose.model<Verification & mongoose.Document>("Verification", new mongoose.Schema<Verification & mongoose.Document>({
    guildId: { type: String },
    memberId: { type: String },
    memberName: { type: String },
    issuerId: { type: String, default: 'pending' },
    issuerName: { type: String, default: 'pending' },
    status: { type: String, default: 'pending' },
    answers: { type: Object, default: [] },
    registeredAt: { type: Number },
    updatedAt: { type: Number },
    expireAt: { type: Number }
}));

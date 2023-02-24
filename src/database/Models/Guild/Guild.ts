/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Guild.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 07:19:49 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/07 01:56:45 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import mongoose from "mongoose";

export interface Guild {
    guildId?: string;
    ownerId?: string;

    premium?: boolean;
    premiumTier?: string;
    premiumHash?: string;

    mainGuild?: boolean;

    blacklist?: boolean;
    blacklistReason?: string;
    blacklistCase?: string;
    blacklistIssuer?: string;

    logging?: boolean;
    loggingChannel?: string;
    loggingModeration?: string;
    loggingUpdate?: string;

    inviteCheck?: boolean;

    level?: boolean;
    levelAlertChannel?: string;
    levelBoost?: number;

    roleEnabled?: boolean;
    roleUnverified?: string;
    roleVerified?: string;
    roleRule?: string;

    verification?: boolean;
    verificationChannel?: string;
    verificationLogChannel?: string;

    interaction?: boolean;
}

export default mongoose.model<Guild & mongoose.Document>("Guild", new mongoose.Schema<Guild & mongoose.Document>({
    guildId: { type: String },
    ownerId: { type: String },

    premium: { type: Boolean, default: false },
    premiumTier: { type: String, default: "none" },
    premiumHash: { type: String, default: "none" },

    mainGuild: { type: Boolean, default: false },

    blacklist: { type: Boolean, default: false },
    blacklistReason: { type: String, default: "" },
    blacklistCase: { type: String, default: "" },
    blacklistIssuer: { type: String, default: "" },

    logging: { type: Boolean, default: false },
    loggingChannel: { type: String, default: "" },
    loggingModeration: { type: String, default: "" },
    loggingUpdate: { type: String, default: "" },

    inviteCheck: { type: Boolean, default: false },

    level: { type: Boolean, default: false },
    levelAlertChannel: { type: String, default: "" },
    levelBoost: { type: Number, default: 0 },

    roleEnabled: { type: Boolean, default: false },
    roleUnverified: { type: String, default: "" },
    roleVerified: { type: String, default: "" },
    roleRule: { type: String, default: "" },

    verification: { type: Boolean, default: false },
    verificationChannel: { type: String, default: "" },
    verificationLogChannel: { type: String, default: "" },

    interaction: { type: Boolean, default: true }
}));
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Guild.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 07:19:49 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 01:24:30 by NebraskyThe      ###   ########.fr       */
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

    premium: { type: Boolean },
    premiumTier: { type: String },
    premiumHash: { type: String },

    mainGuild: { type: Boolean },

    blacklist: { type: Boolean },
    blacklistReason: { type: String },
    blacklistCase: { type: String },
    blacklistIssuer: { type: String },

    logging: { type: Boolean },
    loggingChannel: { type: String },
    loggingModeration: { type: String },
    loggingUpdate: { type: String },

    level: { type: Boolean },
    levelAlertChannel: { type: String },
    levelBoost: { type: Number },

    roleEnabled: { type: Boolean },
    roleUnverified: { type: String },
    roleVerified: { type: String },
    roleRule: { type: String },

    verification: { type: Boolean },
    verificationChannel: { type: String },
    verificationLogChannel: { type: String },

    interaction: { type: Boolean }
}));
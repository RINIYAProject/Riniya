/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Guild.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 07:19:49 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 08:20:12 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseModel from "../../BaseModel";
import { Callback, Schema } from "mongoose";

export interface IGuild extends Document {
    guildId: String;
    ownerId: String;
    config?: guildConfig;
}

export declare type guildConfig = {};

export class GuildSchema extends Schema {
    public constructor() {
        super({
            guildId: { type: String },
            ownerId: { type: String },
            config: { type: Object, default: {} }
        });
    }
}

export default class Guild extends BaseModel<IGuild, GuildSchema> {
    public constructor() {
        super("Guild");
    }

    public schematic(): Schema {
        return new GuildSchema();
    }

    public fetchGuild(guildId: string): IGuild {
        return this.findOne({ guildId: guildId }).toConstructor();
    }

    public isExist(guildId: string): Boolean {
        return this.findOne({ guildId: guildId }).toConstructor();
    }

    public createGuild(guildId: string, ownerId: string): void {
        this.model.insertMany({
            guildId: guildId,
            ownerId: ownerId,
            config: {
                logging: {
                    moderation: null,
                    update: null,
                    enabled: false
                },
                level: {
                    alertChannel: null,
                    rewards: [],
                    enabled: false
                },
                verification: {
                    config: {
                        verifyChannel: null,
                        logChannel: null,
                        password: null,
                    },
                    enabled: false
                },
                online: {
                    displayServer: false,
                    displayMembers: false,
                    allowJoining: false,
                    metadata: []
                },
                blacklisted: {
                    issuer: null,
                    caseId: null,
                    reasons: null,
                    enabled: false
                }
            }
        });
    }

    public updateGuild(guildId: string, update: any, callback: Callback<IGuild>): void {
        this.model.updateOne({ guildId: guildId }, update, { upsert: true }, callback);
    }
    public deleteGuild(guildId: string): void {
        this.model.deleteOne({ guildId: guildId });
    }
}
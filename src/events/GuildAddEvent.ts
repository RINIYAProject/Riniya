/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GuildAddEvent.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:41 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 00:22:09 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/BaseEvent";
import { registerCommands } from "../utils/registerCommand";
import { Guild } from "discord.js";

import GuildModel from "../database/Models/Guild/Guild";

export default class GuildAddEvent extends BaseEvent {
    public constructor() {
        super("guildCreate", async (guild: Guild) => {
            const guildData = await new GuildModel({
                guildId: guild.id,
                ownerId: guild.ownerId,

                premium: false,
                mainGuild: false,
                blacklist: false,
                logging: false,
                level: false,
                verification: false,
                roleEnabled: false,
                interaction: true
            }).save();

            this.instance.logger.info(`Guild ${guildData.guildId} registered.`);

            registerCommands(
                this.instance,
                guild.id,
                guild.name,
                this.instance.manager
            );
        });
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GuildAddEvent.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:41 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 07:53:32 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "@riniya.ts/components/BaseEvent";
import { registerCommands } from "@riniya.ts/utils/registerCommand";
import GuildModel from "@riniya.ts/database/Guild/Guild";

import { Guild } from "discord.js";


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
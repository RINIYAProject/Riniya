/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GuildDeleteEvent.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:41 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 07:54:27 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "@riniya.ts/components/BaseEvent";
import GuildModel from "@riniya.ts/database/Guild/Guild";

import { Guild } from "discord.js";

export default class GuildDeleteEvent extends BaseEvent {
    public constructor() {
        super("guildDelete", async (guild: Guild) => {
            GuildModel.deleteOne({ guildId: guild.id });
        });
    }
}
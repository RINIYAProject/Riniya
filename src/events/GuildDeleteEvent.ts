/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GuildDeleteEvent.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:41 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:29:24 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/components/BaseEvent";
import { Guild } from "discord.js";
import GuildModel from "../database/Models/Guild/Guild";

export default class GuildDeleteEvent extends BaseEvent {
    public constructor() {
        super("guildDelete", async (guild: Guild) => {
            GuildModel.deleteOne({ guildId: guild.id });
        });
    }
}
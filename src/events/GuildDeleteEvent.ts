/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GuildDeleteEvent.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:41 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 09:21:02 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/BaseEvent";
import { Guild } from "discord.js";
import GuildModel from "../database/Models/Guild/Guild";

export default class GuildDeleteEvent extends BaseEvent {
    public constructor() {
        super("guildDelete", async (guild: Guild) => {
            GuildModel.deleteOne({ guildId: guild.id });
        });
    }
}
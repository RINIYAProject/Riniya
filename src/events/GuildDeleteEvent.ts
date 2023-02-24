/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GuildDeleteEvent.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:41 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/02 02:59:31 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "@riniya.ts/components/BaseEvent";

import { Guild } from "discord.js";

export default class GuildDeleteEvent extends BaseEvent {
    public constructor() {
        super("guildDelete", async (guild: Guild) => {
            this.instance.serverManager.websocket.sendPacket("RTC_SERVER_DELETED", {
                guildId: guild.id
            }, "*")
        });
    }
}
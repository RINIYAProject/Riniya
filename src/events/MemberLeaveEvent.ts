/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MemberLeaveEvent.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:54 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 07:57:25 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "@riniya.ts/components/BaseEvent";
import Guild from "@riniya.ts/database/Guild/Guild";

import { GuildMember, TextChannel } from "discord.js";

export default class MemberLeave extends BaseEvent {
    public constructor() {
        super("guildMemberRemove", async (member: GuildMember) => {
            if (member.user.bot) return;
            if (member.user.system) return;

            this.instance.serverManager.websocket.sendPacket("RTC_MEMBER_LEFT", {
                guildId: member.guild.id,
                memberId: member.id
            }, "*")

            const GuildData = await Guild.findOne({ guildId: member.guild.id });

            if (GuildData.logging) {
                const channel: TextChannel = this.instance.guilds.cache.get(GuildData.guildId).channels.cache.get(GuildData.loggingChannel) as TextChannel;
                channel.send({
                    "embeds": [
                        {
                            "type": "rich",
                            "title": `${member.user.username} left the server.`,
                            "description": ``,
                            "color": 0xff0080,
                            "thumbnail": {
                                "url": `https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.jpeg`,
                                "height": 128,
                                "width": 128
                            }
                        }
                    ]
                })
            }
        });
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MemberJoinEvent.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:51 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 09:38:19 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/BaseEvent";
import { GuildMember, TextChannel } from "discord.js";
import Guild from "../database/Models/Guild/Guild";
import Member from "../database/Models/Guild/Member";

export default class MemberJoin extends BaseEvent {
    public constructor() {
        super("guildMemberAdd", async (member: GuildMember) => {
            if (member.user.bot) return;
            if (member.user.system) return;

            const GuildData = await Guild.findOne({ guildId: member.guild.id });
            new Member({ guildId: member.guild.id, memberId: member.id }).save();

            if (GuildData.logging) {
                const channel: TextChannel = this.instance.guilds.cache.get(GuildData.guildId).channels.cache.get(GuildData.loggingChannel) as TextChannel;
                channel.send({
                    "embeds": [
                        {
                            "type": "rich",
                            "title": `Welcome ${member.user.username} on the lounge.`,
                            "description": `Don't forget to go in <#${GuildData.verificationChannel}> to start your verification.`,
                            "color": 0x36393f,
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
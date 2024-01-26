/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MemberJoinEvent.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:51 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/08 01:27:28 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "@riniya.ts/components/BaseEvent";
import Guild from "@riniya.ts/database/Guild/Guild";
import { GuildMember, Role, TextChannel } from "discord.js";
import Blacklist from '@riniya.ts/database/Common/Blacklist'
import { isNull } from '@riniya.ts/types'

export default class MemberJoin extends BaseEvent {
    public constructor() {
        super("guildMemberAdd", async (member: GuildMember) => {
            if (member.user.bot) return;
            if (member.user.system) return;

            this.instance.serverManager.websocket.sendPacket("RTC_MEMBER_JOINED", {
                guildId: member.guild.id,
                memberId: member.id
            }, "*")

            const GuildData = await Guild.findOne({ guildId: member.guild.id });

            if (GuildData.roleEnabled) {
                const defaultRole: Role = member.guild.roles.cache.get(GuildData.roleUnverified);
                await member.roles.add(defaultRole);
            }

            const blacklisted = await Blacklist.findOne({ userId: member.id })

            if (!isNull(blacklisted)) {
                if (GuildData.loggingModeration) {
                  const channel: TextChannel = this.instance.guilds.cache.get(GuildData.guildId).channels.cache.get(GuildData.loggingModeration) as TextChannel;
                  await channel.send({
                    "embeds": [
                      {
                        "type": "rich",
                        "title": `Blacklisted user`,
                        "description": `Be aware ${member.displayName} was blacklisted internally for ${blacklisted.reason} by ${blacklisted.issuedBy}`,
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
            }

            if (GuildData.logging) {
                const channel: TextChannel = this.instance.guilds.cache.get(GuildData.guildId).channels.cache.get(GuildData.loggingChannel) as TextChannel;
                await channel.send({
                  "embeds": [
                    {
                      "type": "rich",
                      "title": `Welcome ${member.user.username} on the lounge.`,
                      "description": `Don't forget to go in <#${GuildData.verificationChannel}> to do your verification.`,
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

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
import { fetchBlacklist } from "@riniya.ts/types";

import { GuildMember, MessageEmbed, Role, TextChannel } from "discord.js";

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
            const channel: TextChannel = this.instance.guilds.cache.get(GuildData.guildId)
                .channels.cache.get(GuildData.loggingModeration) as TextChannel;

            await fetchBlacklist(member.id)
                .then((result) => {
                    if (result && result.issuedBy) {
                        member.kick(`Blacklisted ${result.reason} | ${result.issuedBy}`).then(() => {
                            channel.send({
                                embeds: [
                                    new MessageEmbed()
                                        .setTitle(`${member.user.username} got kicked.`)
                                        .setDescription(`This user has been blacklisted by ${result.issuedBy} as reason ${result.reason}.`)
                                        .addField("Case Id", result._id, true)
                                ]
                            });
                        });
                    }
                });

            if (GuildData.roleEnabled) {
                const defaultRole: Role = member.guild.roles.cache.get(GuildData.roleUnverified);
                member.roles.add(defaultRole);
            }

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
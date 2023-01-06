/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   types.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:23:57 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 05:32:09 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Sanction from "./database/Models/Moderation/Sanction";
import { Guild, GuildMember, MessageEmbed, TextChannel } from "discord.js"
import GuildModel from "./database/Models/Guild/Guild"
import Ghidorah from "./index";

export async function fetchGuild(guildId: string) {
    return await GuildModel.findOne({ guildId: guildId })
}

export function sanction(
    guild: Guild,
    staff: GuildMember,
    target: GuildMember,
    reason: string,
    type: string): Object {
    fetchGuild(guild.id).then(async (result) => {
        if (result.logging) {
            const channel: TextChannel = guild.channels.cache.get(result.loggingModeration) as TextChannel;
            channel.send({
                components: [
                    {
                        type: 1,
                        components: [
                            Ghidorah.instance.buttonManager.createLinkButton("Profile", `https://www.riniya.com/server/${guild.id}/profile/${target.id}`),
                            Ghidorah.instance.buttonManager.createLinkButton("Dashboard", "https://www.riniya.com/dashboard/" + guild.id)
                        ]
                    }
                ],
                embeds: [
                    new MessageEmbed({
                        "title": "",
                        "description": "A sanction has been issued on the server.",
                        "color": 0xff3a20,
                        "fields": [
                            {
                                "name": `Type`,
                                "value": `${type.toUpperCase()}`,
                                "inline": true
                            },
                            {
                                "name": `Reason`,
                                "value": `${reason}`,
                                "inline": true
                            },
                            {
                                "name": `Issued By`,
                                "value": `${staff.user.username}`,
                                "inline": true
                            },
                            {
                                "name": `Target`,
                                "value": `${target.user.username}`,
                                "inline": true
                            }
                        ],
                        "author": {
                            "name": `Sanction information`,
                            "icon_url": `https://cdn.discordapp.com/attachments/1060741322358661191/1060745256636796948/a6d05968d7706183143518d96c9f066e.png`
                        }
                    })
                ]
            });
        }
    })
    new Sanction({
        guildId: guild.id,
        memberId: target.id,
        type: type.toUpperCase(),
        reason: reason,
        issuedBy: staff.id
    }).save();
    if (type === "ban")
        target.ban({ reason: reason });
    else if (type === "kick")
        target.kick(reason);
    else if (type === "mute")
        target.disableCommunicationUntil(1000, reason);
    return {
        components: [
            {
                type: 1,
                components: [
                    Ghidorah.instance.buttonManager.createLinkButton("Website", "https://www.riniya.com"),
                    Ghidorah.instance.buttonManager.createLinkButton("Appeal", "https://www.riniya.com/server/" + guild.id + "/" + type + "/" + target.id + "/appeal")
                ]
            }
        ],
        embeds: [
            new MessageEmbed()
                .setTitle(`${guild.name} - ${type.toUpperCase()} INFORMATION`)
                .setDescription(`You are receiving this message because you've got a sanction on this server. \n\n You can contest this sanction by clicking on "Appeal".`)
                .setColor("RED")
                .addField("Issuer", staff.user.username, true)
                .addField("Reason", reason, true)
        ]
    }
}


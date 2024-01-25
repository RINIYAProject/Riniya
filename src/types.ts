/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   types.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:23:57 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/08 16:01:53 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from "@riniya.ts";
import Sanction from "@riniya.ts/database/Moderation/Sanction";
import GuildModel from "@riniya.ts/database/Guild/Guild";
import { Guild, GuildMember, MessageEmbed, Snowflake, TextChannel, User, Interaction } from "discord.js"
import GuildData from "@riniya.ts/database/Guild/Guild"
import Blacklist from "@riniya.ts/database/Common/Blacklist";
import { v4 } from "uuid";
import Logger from "@riniya.ts/logger";
import InteractionData from '@riniya.ts/database/Common/Interaction'
import { Member } from '@riniya.ts/database/Guild/Member'

export function getInstance(): Riniya {
    return Riniya.instance;
}

export function getLogger(): Logger {
    return Riniya.instance.logger;
}

export async function fetchBlacklist(userId: Snowflake) {
    return Blacklist.findOne({ userId: userId }, null, {
        sort: {
          'registeredAt': -1
        }
    })
}

export async function fetchGuild(guildId: string) {
    return GuildModel.findOne({ guildId: guildId })
}

export async function fetchMember(guildId: string, memberId: string): Promise<GuildMember> {
    return Riniya.instance.guilds.cache.get(guildId).members.cache.get(memberId);
}

export declare type GuildMentionable = GuildMember | User;

export function sanction(
    guild: Guild,
    staff: GuildMember,
    target: GuildMember,
    reason: string,
    type: string): Object {
    fetchGuild(guild.id).then(async (result) => {
        if (result.logging) {
            const channel: TextChannel = guild.channels.cache.get(result.loggingModeration) as TextChannel;
            await channel.send({
              components: [
                {
                  type: 1,
                  components: [
                    Riniya.instance.buttonManager.createLinkButton("Profile", `https://www.riniya.uk/servers/${guild.id}/profiles/${target.id}`),
                    Riniya.instance.buttonManager.createLinkButton("Dashboard", "https://dashboard.riniya.uk/servers/" + guild.id)
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
        target.disableCommunicationUntil(1000, reason).then(r =>  r.isCommunicationDisabled() == true);
    else if (type === "blacklist")
        new Blacklist({
            userId: target.id,
            caseId: v4(),
            reason: reason,
            issuedBy: staff.id,
            registeredAt: new Date()
        }).save()
    return {
        components: [
            {
                type: 1,
                components: [
                    Riniya.instance.buttonManager.createLinkButton("Website", "https://www.riniya.uk"),
                    Riniya.instance.buttonManager.createLinkButton("Appeal", "https://www.riniya.uk/server/" + guild.id + "/" + type + "/" + target.id + "/appeal")
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

export async function blacklist(
    staff: User,
    target: User,
    reason: string) {
        await new Blacklist({
          userId: target.id,
          caseId: v4(),
          reason: reason,
          issuedBy: staff.id,
          registeredAt: new Date()
        }).save()
        await target.send({
          embeds: [
            new MessageEmbed({
              "title": "",
              "description": "You have been blacklisted from Riniya.",
              "color": 0xff3a20,
              "fields": [
                {
                  "name": `Reason`,
                  "value": `${reason}`,
                  "inline": true
                },
                {
                  "name": `Issued By`,
                  "value": `${staff.username}`,
                  "inline": true
                },
                {
                  "name": `Target`,
                  "value": `${target.username}`,
                  "inline": true
                }
              ],
              "author": {
                "name": `Blacklist information`,
                "icon_url": `https://cdn.discordapp.com/attachments/1060741322358661191/1060745256636796948/a6d05968d7706183143518d96c9f066e.png`
              }
            })
          ]
        }).then(r => setTimeout(r.delete, 3000));
}

export function isNull(object: unknown): Boolean {
    return object === null || object === undefined;

}

export function isTypeNull<T>(object: unknown): Boolean {
     return object === null || object === undefined || !(object as T);
}

export declare type AuthenticationSession<USER> = {
    clientToken?: string;
    refreshToken?: string;
    user?: USER;
}

export async function connect<T>(username: string, password: string): Promise<AuthenticationSession<T>> {

    // TODO: Database connection / sync

    return new Promise<AuthenticationSession<T>>((resolve, reject) => {

    })
}

export async function updateVerification(id: string, target: GuildMember, message: string) {
    const GuildModel = await GuildData.findOne({ guildId: id });
    const channel: TextChannel = Riniya.instance.guilds.cache.get(id).channels.cache.get(GuildModel.verificationLogChannel) as TextChannel;
    const interMessage = await InteractionData.findOne({
      guildId: GuildModel.guildId,
      memberId: target.id,
      deleted: false
    })

    if (isNull(interMessage)) {
        return;
    }

    await channel.messages.fetch(interMessage.messageId).then(r => r.edit({
      components: [
        {
          type: 1,
          components: [
            Riniya.instance.buttonManager.createLinkButton(message, "https://www.riniya.uk")
          ]
        }
      ]
    }))

    await InteractionData.deleteOne({ _id: interMessage._id })
}

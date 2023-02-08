/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandTargetInvite.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:54 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/08 15:44:38 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SlashCommandUserOption } from "@discordjs/builders";
import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import { getRest } from "@riniya.ts/utils/registerCommand";
import { Routes } from "discord-api-types/v9";

import { GuildMember, Guild, CommandInteraction, MessageEmbed, User, Activity, SnowflakeUtil } from "discord.js";

export default class CommandTargetInvite extends BaseCommand {

    public constructor() {
        super("targetinv", "Create a ephemeral invite for a specified user.", new OptionMap<string, boolean>()
            .add("isDeveloper", true),
            "OWNER"
        );

        this.addUserOption(
            new SlashCommandUserOption()
                .setName("target")
                .setDescription("Please select a target.")
                .setRequired(true)
        )
    }

    async handler(inter: CommandInteraction<"cached">, member: GuildMember, guild: Guild) {
        const target: User = inter.options.getUser("target", true);

        const message: MessageEmbed = new MessageEmbed()
            .setTitle(`Invite created.`)
            .setColor("RED")
            .setDescription("This invite is made for " + target.username + " and can only be used by them.")

        const test = getRest().post(
            Routes.channelInvites(guild.systemChannelId), 
            {
                body: {
                    "max_uses": 1,
                    "unique": true,
                    "target_user_id": target.id
                }
            }
        )

        await guild.invites.create(guild.systemChannel, {
            maxUses: 1,
            unique: true,
            targetUser: target.id,
            reason: "Invite created.",
            targetType: 1
        }).then(invite => {
            message.setColor("ORANGE")
            message.setAuthor("1 invite has been created.")
            message.addField("Invite", `${invite.url}`, true)
        }).catch(err => {
            message.setDescription("Unable to create invite.")
            message.setAuthor("Invite creation failed.")
            message.addField("Error", `${err}.`)
        })

        inter.reply({
            embeds: [message]
        })
    }
}
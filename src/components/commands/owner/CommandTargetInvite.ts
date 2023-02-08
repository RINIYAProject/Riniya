/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandTargetInvite.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:54 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/08 15:14:25 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SlashCommandUserOption } from "@discordjs/builders";
import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";

import { GuildMember, Guild, CommandInteraction, MessageEmbed, User } from "discord.js";

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

        await guild.invites.create(guild.systemChannel, {
            maxUses: 1,
            unique: true,
            targetUser: target.id,
            reason: "Invite created."
        }).then(invite => {
            message.addField("Invite", `${invite.url}`, true)
        }).catch(err => {
            message.addField("Error", `${err}.`)
        })

        inter.reply({
            embeds: [message]
        })
    }
}
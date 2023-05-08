/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandBlacklist.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:44 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/08 16:03:07 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SlashCommandStringOption, SlashCommandSubcommandBuilder, SlashCommandUserOption } from "@discordjs/builders";
import BaseCommand from "@riniya.ts/components/BaseCommand";
import { fetchBlacklist, sanction } from "@riniya.ts/types";
import OptionMap from "@riniya.ts/utils/OptionMap";
import { GuildMember, Guild, CommandInteraction, User, MessageEmbed } from "discord.js";

// DEPRECATED 
// This command will be deleted soon.

export default class CommandBlacklist extends BaseCommand {
    public constructor() {
        super("blacklist", "Blacklist a user", new OptionMap<string, boolean>()
            .add("isDeveloper", true),
            "OWNER"
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("add")
                .setDescription("Create a blacklist entry.")
                .addUserOption(
                    new SlashCommandUserOption()
                        .setName("target")
                        .setDescription("Please mention a user.")
                        .setRequired(true)
                )
                .addStringOption(
                    new SlashCommandStringOption()
                        .setName("reason")
                        .setDescription("Please set a reason.")
                        .setRequired(true)
                )
        )

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("check")
                .setDescription("Check if the mentionned user is blacklisted.")
                .addUserOption(
                    new SlashCommandUserOption()
                        .setName("target")
                        .setDescription("Please mention a user.")
                        .setRequired(true)
                )
        )

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("remove")
                .setDescription("Remove a blacklist entry.")
                .addUserOption(
                    new SlashCommandUserOption()
                        .setName("target")
                        .setDescription("Please mention a user.")
                        .setRequired(true)
                )
        )
    }

    async handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        const command = inter.options.getSubcommand(true);
        const user: GuildMember = guild.members.cache.get(inter.options.getUser("target", true).id);
        const reason: string = inter.options.getString("reason") || "No reason provided.";

        const message: MessageEmbed = new MessageEmbed();
        message.setTitle("Blacklist")
        message.setColor("RED")

        switch (command) {
            case "add": {
                message.setAuthor("1 user has been added.")
                message.setDescription("You blacklisted " + user.user.username + " for " + reason)
                message.setTimestamp(new Date())
                user.send(sanction(guild, member, user, reason, "blacklist"))
            }
            break;
            case "check": {
                const data = await fetchBlacklist(user.id)
                if (data) {
                    message.setColor("RED")
                    message.setAuthor("1 case found on " + user.user.username)
                    message.setDescription("This user has been blacklisted.")
                    message.addField("Issued By", data.issuedBy, true)
                    message.addField("Case Id", data.caseId, true)
                    message.addField("Reason", data.reason, true)
                    message.setTimestamp(data.registeredAt)
                } else {
                    message.setColor("GREEN")
                    message.setAuthor("No case has been found.")
                    message.setDescription("This user have a clean slate.");
                }
            }
            break;
            case "remove": {
                message.setAuthor("This operation cannot be performed.")
                message.setDescription("A database access is required to remove a blacklist case.")
                message.setColor('RED')
            }
            break;
        }

        inter.reply({
            embeds: [message],
            ephemeral: true
        })

        this.instance.serverManager.websocket.sendPacket("RTC_BLACKLIST_ACK", {
            type: command,
            user: user
        }, "*")
    }
}
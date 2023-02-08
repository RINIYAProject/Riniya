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
import { sanction } from "@riniya.ts/types";
import OptionMap from "@riniya.ts/utils/OptionMap";
import { GuildMember, Guild, CommandInteraction, User, MessageEmbed } from "discord.js";

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

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        const command = inter.options.getSubcommand(true);
        const user: GuildMember = guild.members.cache.get(inter.options.getUser("target", true).id);
        const reason: string = inter.options.getString("reason") || "No reason provided.";

        const message: MessageEmbed = new MessageEmbed();
        message.setTitle("Blacklist")
        message.setColor("RED")

        switch (command) {
            case "add": {
                message.setAuthor("1 blacklisted user has been added.")
                message.setDescription("You blacklisted " + user.user.username + " for " + reason)
                message.setTimestamp(new Date())
                sanction(guild, member, user, reason, "blacklist")
            }
        }
    }
}
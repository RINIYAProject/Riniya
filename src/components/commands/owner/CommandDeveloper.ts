/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandDeveloper.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:10 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:39:11 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap";
import { GuildMember, Guild, CommandInteraction, User, MessageEmbed } from "discord.js";
import { SlashCommandSubcommandBuilder, SlashCommandUserOption } from "@discordjs/builders";
import Developer from "database/Models/Security/Developer";

export default class CommandDeveloper extends BaseCommand {
    public constructor() {
        super("developer", "Developer access management", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isDeveloper", true)
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("check")
                .setDescription("Check if the user is a developer.")
                .addUserOption(
                    new SlashCommandUserOption()
                        .setName("user")
                        .setDescription("Select a user")
                )
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("add")
                .setDescription("Add a developer.")
                .addUserOption(
                    new SlashCommandUserOption()
                        .setName("user")
                        .setDescription("Select a user")
                )
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("remove")
                .setDescription("Remove a developer.")
                .addUserOption(
                    new SlashCommandUserOption()
                        .setName("user")
                        .setDescription("Select a user")
                )
        )
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        const command: string = inter.options.getSubcommand() || 'default';
        const user: User = inter.options.getUser("user", true);

        if (user.id === member.id) {
            return inter.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Riniya - Developer")
                        .setDescription("You can't execute this command on yourself.")
                        .setColor("#36393f")
                ],
                ephemeral: true
            });
        }

        switch (command) {
            case "check": {
                if (Developer.findOne({ userId: user.id }))
                    return inter.reply({
                        embeds: [
                            new MessageEmbed()
                                .setTitle("Riniya - Developer")
                                .setDescription(`${user.username} is a developer.`)
                                .setColor("#36393f")
                        ]
                    });
                else
                    return inter.reply({
                        embeds: [
                            new MessageEmbed()
                                .setTitle("Riniya - Developer")
                                .setDescription(`${user.username} is not a developer.`)
                                .setColor("#36393f")
                        ]
                    });
            }
            case "add": {
                new Developer({ userId: user.id });
                return inter.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("Riniya - Developer")
                            .setDescription(`${user.username} added as developer.`)
                            .setColor("#36393f")
                    ]
                });
            }
            case "remove": {
                Developer.deleteOne({ userId: user.id });
                return inter.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("Riniya - Developer")
                            .setDescription(`${user.username} is not a developer anymore.`)
                            .setColor("#36393f")
                    ]
                });
            }
            case "default": {
                return inter.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("Riniya - Developer")
                            .setDescription(`Please select a sub command.`)
                            .setColor("#36393f")
                    ]
                });
            }
        }
    }
}
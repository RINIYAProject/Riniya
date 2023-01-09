/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandDeveloper.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:10 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:06:37 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import Developer from "@riniya.ts/database/Security/Developer";

import { GuildMember, Guild, CommandInteraction, User, MessageEmbed } from "discord.js";
import { SlashCommandSubcommandBuilder, SlashCommandUserOption } from "@discordjs/builders";

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
        const user: User = inter.options.getUser("user") || member.user;
        
        switch (command) {
            case "check": {
                if (Developer.exists({ userId: user.id }))
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
                new Developer({ userId: user.id }).save();
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
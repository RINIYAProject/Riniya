/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandRole.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 08:02:15 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/09 08:02:16 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import RoleModel from "@riniya.ts/database/Guild/Role";

import { SlashCommandRoleOption, SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType, GuildMember, Guild, MessageEmbed } from "discord.js";

export default class CommandRole extends BaseCommand {

    public constructor() {
        super("roles", "Manage the self assignable role.",
            new OptionMap<string, boolean>()
                .add("isProtected", true)
        )

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("add")
                .setDescription("Add a self assignable role.")
                .addRoleOption(
                    new SlashCommandRoleOption()
                        .setName("role")
                        .setDescription("Select the role.")
                        .setRequired(true)
                )
        );
        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("remove")
                .setDescription("Remove a self assignable role.")
                .addRoleOption(
                    new SlashCommandRoleOption()
                        .setName("role")
                        .setDescription("Select the role.")
                        .setRequired(true)
                )
        );
        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("info")
                .setDescription("Get information from a self assignable role.")
                .addRoleOption(
                    new SlashCommandRoleOption()
                        .setName("role")
                        .setDescription("Select the role.")
                        .setRequired(true)
                )
        );
    }

    public async handler(inter: CommandInteraction<CacheType>, member: GuildMember, guild: Guild): Promise<void> {
        //inter.deferReply({ephemeral: true}); FUCKING SHIT 

        const command: string = inter.options.getSubcommand(true);
        const role = inter.options.getRole("role", true);

        switch (command) {
            case "add": {
                new RoleModel({
                    roleId: role.id,
                    guildId: guild.id,
                    type: "furry",
                    selfAssignable: true
                }).save()
                inter.reply({
                    content: `Role ${role.name} is now on the selector.`,
                    ephemeral: true
                });
            }
                break;
            case "remove": {
                await RoleModel.deleteOne({
                    roleId: role.id,
                    guildId: guild.id
                });
                inter.reply({
                    content: `Role ${role.name} is now removed from selector.`,
                    ephemeral: true
                });
            }
                break;
            case "info": {
                if (RoleModel.exists({ roleId: role.id, guildId: guild.id })) {
                    inter.reply({
                        embeds: [
                            new MessageEmbed()
                                .addField("Role Name", role.name, true)
                                .addField("Role Id", role.id, true)
                                .addField("Role Color", role.color.toString())
                        ],
                        ephemeral: true
                    });
                } else {
                    inter.reply({
                        content: `This role is not on the selector.`,
                        ephemeral: true
                    });
                }
            }
        }
    }
}
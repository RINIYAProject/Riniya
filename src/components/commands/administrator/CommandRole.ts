import { SlashCommandRoleOption, SlashCommandSubcommandBuilder } from "@discordjs/builders";
import BaseCommand from "../../../abstracts/components/BaseCommand";
import { CommandInteraction, CacheType, GuildMember, Guild, Role, MessageEmbed } from "discord.js";
import OptionMap from "../../../utils/OptionMap";
import RoleModel from "../../../database/Models/Guild/Role";

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
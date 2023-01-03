/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseCommand.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:13 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 09:04:53 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base, { BaseType } from "./Base";
import {
    SlashCommandBuilder,
    SlashCommandAttachmentOption,
    SlashCommandBooleanOption,
    SlashCommandChannelOption,
    SlashCommandIntegerOption,
    SlashCommandMentionableOption,
    SlashCommandNumberOption,
    SlashCommandRoleOption,
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
    SlashCommandSubcommandsOnlyBuilder,
    SlashCommandUserOption,
    ApplicationCommandOptionBase
} from '@discordjs/builders'
import OptionMap from "../utils/OptionMap";
import { PermissionFlagsBits } from "discord-api-types/v9";
import { CommandInteraction, Guild, GuildMember } from "discord.js";

export default abstract class BaseCommand extends Base {

    private command: SlashCommandBuilder;

    public constructor(name: string, description: string, options: OptionMap<string, boolean>) {
        super(name, description, BaseType.COMMAND);
        this.setOptions(options);

        this.command = new SlashCommandBuilder();
        this.command.setName(this.name);
        this.command.setDescription(this.description);
        this.command.setDMPermission(this.options.get("dmPermission"));
        if (this.options.get("isProtected"))
            this.command.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
    }

    public execute(): void { }

    public abstract handler(inter: CommandInteraction, member: GuildMember, guild: Guild): void;

    protected addAttachmentOption(handle: SlashCommandAttachmentOption): BaseCommand {
        this.command.addAttachmentOption(handle);
        return this;
    }

    protected addBooleanOption(handle: SlashCommandBooleanOption): BaseCommand {
        this.command.addBooleanOption(handle);
        return this;
    }

    protected addChannelOption(handle: SlashCommandChannelOption): BaseCommand {
        this.command.addChannelOption(handle);
        return this;
    }

    protected addIntegerOption(handle: SlashCommandIntegerOption): BaseCommand {
        this.command.addIntegerOption(handle);
        return this;
    }

    protected addStringOption(handle: SlashCommandStringOption): BaseCommand {
        this.command.addStringOption(handle);
        return this;
    }

    protected addMentionOption(handle: SlashCommandMentionableOption): BaseCommand {
        this.command.addMentionableOption(handle);
        return this;
    }

    protected addNumberOption(handle: SlashCommandNumberOption): BaseCommand {
        this.command.addNumberOption(handle);
        return this;
    }

    protected addRoleOption(handle: SlashCommandRoleOption): BaseCommand {
        this.command.addRoleOption(handle);
        return this;
    }

    protected addUserOption(handle: SlashCommandUserOption): BaseCommand {
        this.command.addUserOption(handle);
        return this;
    }

    protected addSubCommand(handle: SlashCommandSubcommandBuilder): SlashCommandSubcommandsOnlyBuilder {
        return this.command.addSubcommand(handle);
    }

    protected addSubGroup(handle: SlashCommandSubcommandGroupBuilder): SlashCommandSubcommandsOnlyBuilder {
        return this.command.addSubcommandGroup(handle);
    }

    public getCommand(): SlashCommandBuilder {
        return this.command;
    }
}
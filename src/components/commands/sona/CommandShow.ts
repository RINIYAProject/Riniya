/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandShow.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:31 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:40:32 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SlashCommandUserOption } from "@discordjs/builders";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 

export default class CommandShow extends BaseCommand {
    public constructor() {
        super("show", "Show the fursona of someone", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
        );

        this.addUserOption(
            new SlashCommandUserOption()
                .setName("target")
                .setDescription("Select a member")
                .setRequired(false)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
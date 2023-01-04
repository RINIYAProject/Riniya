/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandFuck.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:52 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:40:53 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SlashCommandUserOption } from "@discordjs/builders";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 

export default class CommandFuck extends BaseCommand {
    public constructor() {
        super("fuck", "Fuck someone", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
            .add("isNSFW", true)
        );

        this.addUserOption(
            new SlashCommandUserOption()
                .setName("target")
                .setDescription("Select the person you want to fuck")
                .setRequired(true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
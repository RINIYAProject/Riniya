/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandFuck.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:52 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:04:23 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SlashCommandUserOption } from "@discordjs/builders";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

import BaseCommand from "../../../abstracts/components/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 

export default class CommandFuck extends BaseCommand {
    public constructor() {
        super("fuck", "Fuck someone", new OptionMap<string, boolean>()
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
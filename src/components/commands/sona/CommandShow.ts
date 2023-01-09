/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandShow.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:31 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:03:24 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SlashCommandUserOption } from "@discordjs/builders";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

import BaseCommand from "../../../abstracts/components/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 

export default class CommandShow extends BaseCommand {
    public constructor() {
        super("show", "Show the fursona of someone", new OptionMap<string, boolean>()
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
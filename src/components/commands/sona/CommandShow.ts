/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandShow.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:31 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:54:25 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SlashCommandUserOption } from "@discordjs/builders";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";

export default class CommandShow extends BaseCommand {
    public constructor() {
        super("show", "Show the fursona of someone", new OptionMap<string, boolean>,
            "SONA"
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
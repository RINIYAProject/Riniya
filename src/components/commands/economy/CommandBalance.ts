/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandBalance.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:36 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:10:34 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";

import { GuildMember, Guild, CommandInteraction } from "discord.js";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import OptionMap from "@riniya.ts/utils/OptionMap";

export default class CommandBalance extends BaseCommand {
    public constructor() {
        super("balance", "Looking at your bank money.",
            new OptionMap<string, boolean>,
            "ECONOMY"
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("pay")
                .setDescription("Send money to someone.")
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("loans")
                .setDescription("Ask a loans to someone.")
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
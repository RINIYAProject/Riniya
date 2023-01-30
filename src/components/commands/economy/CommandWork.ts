/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandWork.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:49 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:11:19 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";

import { GuildMember, Guild, CommandInteraction } from "discord.js";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import OptionMap from "@riniya.ts/utils/OptionMap";

export default class CommandWork extends BaseCommand {
    public constructor() {
        super("work", "Start mining and get money",
            new OptionMap<string, boolean>,
            "ECONOMY"
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("status")
                .setDescription("View the inventory.")
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
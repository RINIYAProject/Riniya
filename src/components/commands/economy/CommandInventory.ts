/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandInventory.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:43 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:10:59 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";

import { GuildMember, Guild, CommandInteraction } from "discord.js";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import OptionMap from "@riniya.ts/utils/OptionMap";

export default class CommandInventory extends BaseCommand {
    public constructor() {
        super("inventory", "Displaying your inventory.",
            new OptionMap<string, boolean>,
            "ECONOMY"
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("view")
                .setDescription("View the inventory.")
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("upgrades")
                .setDescription("Upgrade your inventory.")
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("drop")
                .setDescription("Drop a item out of your inventory.")
        );
    }

    public async handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {

    }
}
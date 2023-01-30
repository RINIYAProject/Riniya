/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandShop.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 08:03:05 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/30 00:11:08 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";

import { SlashCommandIntegerOption, SlashCommandStringOption, SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember, Guild } from "discord.js";
import OptionMap from "@riniya.ts/utils/OptionMap";

export default class CommandShop extends BaseCommand {

    public constructor() {
        super("shop", "Access to the shop.",
            new OptionMap<string, boolean>,
            "ECONOMY"
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("buy")
                .setDescription("Buy a item.")
                .addStringOption(
                    new SlashCommandStringOption()
                        .setName("item")
                        .setDescription("Please enter the item name.")
                        .setRequired(true)
                )
                .addIntegerOption(
                    new SlashCommandIntegerOption()
                        .setName("quantity")
                        .setDescription("Please enter the quantity you want")
                )
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("sell")
                .setDescription("Sell a item.")
                .addStringOption(
                    new SlashCommandStringOption()
                        .setName("item")
                        .setDescription("Please enter the item name.")
                        .setRequired(true)
                )
                .addIntegerOption(
                    new SlashCommandIntegerOption()
                        .setName("quantity")
                        .setDescription("Please enter the quantity you want")
                )
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("action")
                .setDescription("View the action shop.")
        );
    }

    public handler(inter: CommandInteraction<"cached">, member: GuildMember, guild: Guild): void {

    }
}
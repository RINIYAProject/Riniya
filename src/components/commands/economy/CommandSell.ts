/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandSell.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:46 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:41:47 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap";
import { SlashCommandNumberOption } from "@discordjs/builders";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandSell extends BaseCommand {
    public constructor() {
        super("sell", "Sell one of your item", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
        );

        this.addNumberOption(
            new SlashCommandNumberOption()
                .setName("itemid")
                .setDescription("Please set the ItemID to sell.")
                .setRequired(true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandInventory.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:43 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:56:24 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/components/BaseCommand";
import { GuildMember, Guild, CommandInteraction } from "discord.js";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";

export default class CommandInventory extends BaseCommand {
    public constructor() {
        super("inventory", "Displaying your inventory.");

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
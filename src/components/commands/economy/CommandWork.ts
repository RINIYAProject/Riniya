/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandWork.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:49 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 05:54:40 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/components/BaseCommand";
import { GuildMember, Guild, CommandInteraction } from "discord.js";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";

export default class CommandWork extends BaseCommand {
    public constructor() {
        super("work", "Start mining and get money");

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("status")
                .setDescription("View the inventory.")
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
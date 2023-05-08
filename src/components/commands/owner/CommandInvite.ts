/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandInvite.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:54 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/08 17:03:53 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SlashCommandNumberOption } from "@discordjs/builders";
import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import Tuple from "@riniya.ts/utils/Tuple";

import { GuildMember, Guild, CommandInteraction, MessageEmbed, Invite, TextChannel } from "discord.js";

// DEPRECATED 
// This command will be deleted soon.

export default class CommandInvite extends BaseCommand {

    private cache: Tuple<Invite> = new Tuple<Invite>()

    public constructor() {
        super("serverinv", "Create ephemeral invites", new OptionMap<string, boolean>()
            .add("isDeveloper", true),
            "OWNER"
        );

        this.addNumberOption(
            new SlashCommandNumberOption()
                .setName("quantity")
                .setMaxValue(20)
                .setDescription("Please set the amounts of invite.")
        )
    }

    async handler(inter: CommandInteraction<"cached">, member: GuildMember, guild: Guild) {
        const amounts: number = inter.options.getNumber("quantity") || 5;
    }
}
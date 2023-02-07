/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandInvite.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:54 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/07 01:07:59 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SlashCommandNumberOption } from "@discordjs/builders";
import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import Tuple from "@riniya.ts/utils/Tuple";

import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";
import { v4 } from "uuid";

export default class CommandInvite extends BaseCommand {

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

        const message: MessageEmbed = new MessageEmbed();
        message.setTitle("Generated invites");
        message.setColor("RED");
        message.setDescription("All this invites are ephemeral and can only be used 1 time.");

        for (var i = 0; i < amounts; i++) {
            guild.invites.create(guild.systemChannelId, {
                maxUses: 1,
                reason: `Trusted user ${v4()}`
            }).then(invite => {
                message.addField(`#${i}`, `${invite.url}`);
            }).catch(err => {
                message.addField(`#${i}`, `Failed to get invite code.`);
            })
        }
        
        message.setAuthor(`${amounts} invite has been created.`);

        inter.reply({
            embeds: [message],
            ephemeral: true
        })
    }
}
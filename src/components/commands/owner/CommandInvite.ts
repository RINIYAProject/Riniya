/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandInvite.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:54 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/07 01:27:45 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SlashCommandNumberOption } from "@discordjs/builders";
import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import Tuple from "@riniya.ts/utils/Tuple";

import { GuildMember, Guild, CommandInteraction, MessageEmbed, Invite } from "discord.js";
import { v4 } from "uuid";

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

        this.cache.clear()
        
        const message: MessageEmbed = new MessageEmbed();
        message.setTitle("Generated invites");
        message.setColor("RED");
        message.setDescription("All this invites are ephemeral and can only be used 1 time.");

        for (var i = 0; i < amounts; i++) {
            await guild.invites.create(guild.systemChannelId, {
                maxUses: 1,
                unique: true,
                reason: `Trusted user ${v4()}`
            }).then(invite => {
                this.cache.add(invite)
            })
        }

        const data = this.cache.getAll().map((id, invite) => {
            let iid = 0
            return {
                name: `Invite #${iid++}`,
                value: id.url,
                inline: false
            }
        })

        message.addFields(data);
        message.setAuthor(`${amounts} invite has been created.`);

        inter.reply({
            embeds: [message],
            ephemeral: true
        })
    }
}
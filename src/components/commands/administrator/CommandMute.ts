/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandMute.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 20:49:10 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:01:36 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import { sanction } from "@riniya.ts/types";

import { GuildMember, Guild, CommandInteraction, MessageEmbed, User } from "discord.js";
import { SlashCommandStringOption, SlashCommandUserOption } from "@discordjs/builders";

export default class CommandMute extends BaseCommand {
    public constructor() {
        super("mute", "Mute a user", new OptionMap<string, boolean>()
            .add("isProtected", true)
        );

        this.addUserOption(
            new SlashCommandUserOption()
                .setName("member")
                .setDescription("Select a member")
                .setRequired(true)
        );

        this.addStringOption(
            new SlashCommandStringOption()
                .setName("reason")
                .setDescription("Set a reason")
                .setRequired(false)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        const target: User = inter.options.getUser('member');
        const targetMember: GuildMember = guild.members.cache.get(target.id);
        const reason: string = inter.options.getString("reason") || 'No reason set.';

        target.send(sanction(guild, member, targetMember, reason, "mute"));
        return inter.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`You muted ${target.username}`)
                    .setColor("RED")
                    .addField("Issuer", member.user.username, true)
                    .addField("Reason", reason, true)
            ],
            ephemeral: true
        });
    }
}
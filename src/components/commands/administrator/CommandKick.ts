/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandKick.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 20:49:03 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:02:34 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/components/BaseCommand";
import OptionMap from "../../../utils/OptionMap";
import { GuildMember, Guild, CommandInteraction, MessageEmbed, User } from "discord.js";
import { SlashCommandStringOption, SlashCommandUserOption } from "@discordjs/builders";
import { sanction } from "../../../types";

export default class CommandKick extends BaseCommand {
    public constructor() {
        super("kick", "Kick a user", new OptionMap<string, boolean>()
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

        target.send(sanction(guild, member, targetMember, reason, "kick"));
        return inter.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`You kicked ${target.username}`)
                    .setColor("RED")
                    .addField("Issuer", member.user.username, true)
                    .addField("Reason", reason, true)
            ],
            ephemeral: true
        });
    }
}
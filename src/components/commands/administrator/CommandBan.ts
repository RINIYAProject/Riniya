/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandBan.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 20:49:07 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 20:53:25 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap";
import { GuildMember, Guild, CommandInteraction, User, MessageEmbed } from "discord.js";
import { SlashCommandStringOption, SlashCommandUserOption } from "@discordjs/builders";
import Sanction from "../../../database/Models/Moderation/Sanction";

export default class CommandBan extends BaseCommand {
    public constructor() {
        super("ban", "Ban a user", new OptionMap<string, boolean>()
            .add("dmPermission", false)
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

        if (target.id === member.id) {
            return inter.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle(`You can't use this command on yourself.`)
                        .setColor("RED")
                ],
                ephemeral: true
            });
        }

        if (targetMember.moderatable) {
            new Sanction({
                guildId: guild.id,
                memberId: target.id,
                type: 'BAN',
                reason: reason,
                issuedBy: member.id
            }).save();
            targetMember.ban({
                reason: reason
            });
            target.send({
                components: [
                    {
                        type: 1,
                        components: [
                            this.instance.buttonManager.createLinkButton("Website", "https://www.riniya.com"),
                            this.instance.buttonManager.createLinkButton("Appeal", "https://www.riniya.com/server/" + guild.id + "/ban/" + target.id + "/appeal")
                        ]
                    }
                ],
                embeds: [
                    new MessageEmbed()
                        .setTitle(`${guild.name} - BAN INFORMATION`)
                        .setDescription(`You are receiving this message because you got banned permanently.`)
                        .setColor("RED")
                        .addField("Issuer", member.user.username, true)
                        .addField("Reason", reason, true)
                        .addField("Expiration", "never", true)
                ]
            });
            inter.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle(`You banned ${target.username}`)
                        .setDescription(`You permanently banned this user.`)
                        .setColor("RED")
                        .addField("Issuer", member.user.username, true)
                        .addField("Reason", reason, true)
                        .addField("Expiration", "never", true)
                ],
                ephemeral: true
            });
        } else {
            inter.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle(`You can't ban this user.`)
                        .setDescription(`This user have higher permission than yours.`)
                        .setColor("RED")
                ]
            });
        }
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandProfile.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:18:48 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:18:49 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SlashCommandUserOption } from "@discordjs/builders";
import { GuildMember, Guild, CommandInteraction, User, MessageEmbed } from "discord.js";

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 

export default class CommandProfile extends BaseCommand {
    public constructor() {
        super("profile", "Showing a user profile.", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
        );

        this.addUserOption(
            new SlashCommandUserOption()
                .setName("user")
                .setDescription("Select a user")
                .setRequired(false)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { 
        const target: User = inter.options.getUser("user") || member.user;

        inter.reply({
            components: [
                {
                    type: 1,
                    components: [
                        this.instance.buttonManager.createLinkButton(`${target.username}'s Profile`, `https://www.riniya.com/server/${guild.id}/profile/${target.id}`)
                    ]
                }
            ],
            embeds: [
                new MessageEmbed()
                    .setTitle("Riniya - Profile")
                    .setColor("#36393f")
            ]
        });
    }
}
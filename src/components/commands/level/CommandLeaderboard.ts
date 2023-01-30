/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandLeaderboard.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:18:46 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:12:39 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";

import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";

export default class CommandLeaderboard extends BaseCommand {
    public constructor() {
        super("leaderboard", "Displaying the server leaderboard", new OptionMap<string, boolean>,
            "LEVEL"
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        inter.reply({
            components: [
                {
                    type: 1,
                    components: [
                        this.instance.buttonManager.createLinkButton("Leaderboard", `https://www.riniya.com/server/${guild.id}/leaderboard`)
                    ]
                }
            ],
            embeds: [
                new MessageEmbed()
                    .setTitle("Riniya - Leaderboard")
                    .setDescription("You can look at the leaderboard on our website.")
                    .setColor("#36393f")
            ]
        });
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandLeaderboard.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:18:46 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:05:31 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/components/BaseCommand";
import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";

export default class CommandLeaderboard extends BaseCommand {
    public constructor() {
        super("leaderboard", "Displaying the server leaderboard");
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
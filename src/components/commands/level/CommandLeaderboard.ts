/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandLeaderboard.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:18:46 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:18:47 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 
import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";

export default class CommandLeaderboard extends BaseCommand {
    public constructor() {
        super("leaderboard", "Displaying the server leaderboard", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
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
                    .setColor("#36393f")
            ]
        });
    }
}
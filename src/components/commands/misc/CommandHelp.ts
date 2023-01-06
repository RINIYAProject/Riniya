/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandHelp.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:05:55 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 01:55:02 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";

export default class CommandHelp extends BaseCommand {
    public constructor() {
        super("help", "Look at the command help.");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        inter.reply({
            components: [
                {
                    type: 1,
                    components: [
                        this.instance.buttonManager.createLinkButton("Documentation", "https://docs.riniya.com"),
                        this.instance.buttonManager.createLinkButton("Dashboard", "https://www.riniya.com/dashboard"),
                        this.instance.buttonManager.createLinkButton("Commands", "https://www.riniya.com/help/commands"),
                        this.instance.buttonManager.createLinkButton("Report a bug", "https://www.riniya.com/support")
                    ]
                }
            ],
            embeds: [
                new MessageEmbed()
                    .setTitle("Riniya - Help")
                    .setDescription("There is all the link that will help you to setup Riniya.")
                    .addField("Version", this.instance.version, true)
                    .addField("Latency", `${this.instance.ws.ping}`, true)
                    .setColor("#36393f")
            ]
        });
    }
}
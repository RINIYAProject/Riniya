/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandPing.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:05:58 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:04:30 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";

export default class CommandPing extends BaseCommand {
    public constructor() {
        super("ping", "Get information about the bot latency");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        inter.reply({
            components: [
                {
                    type: 1,
                    components: [
                        this.instance.buttonManager.createLinkButton("Status Center", "https://www.riniya.com/status"),
                        this.instance.buttonManager.createLinkButton("Support", "https://www.riniya.com/support"),
                        this.instance.buttonManager.createLinkButton("Feedback", "https://www.riniya.com/feedback")
                    ]
                }
            ],
            embeds: [
                new MessageEmbed()
                    .setTitle("Riniya - Latency")
                    .setDescription("This ping are the gateway latency.")
                    .addField("Version", this.instance.version, true)
                    .addField("Latency", `${this.instance.ws.ping}`, true)
                    .setColor("#36393f")
            ]
        });
    }
}
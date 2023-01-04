/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandPing.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:05:58 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:05:59 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap";
import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";

export default class CommandPing extends BaseCommand {
    public constructor() {
        super("ping", "Get information about the bot latency", new OptionMap<string, boolean>()
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
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandHelp.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:05:55 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:05:56 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap";
import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";

export default class CommandHelp extends BaseCommand {
    public constructor() {
        super("help", "Look at the command help.", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", true)
        );
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
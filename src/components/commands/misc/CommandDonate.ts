/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandDonate.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:05:45 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:30:22 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import { CommandInteraction, GuildMember, Guild, MessageEmbed } from "discord.js";

export default class CommandDonate extends BaseCommand {
    public constructor() {
        super("donate", "Make a donation to our service.", new OptionMap<string, boolean>,
            "MISC"
        );
    }

    public handler(inter: CommandInteraction, member: GuildMember, guild: Guild): void {
        inter.reply({
            components: [
                {
                    type: 1,
                    components: [
                        this.instance.buttonManager.createLinkButton("Premium", "https://www.riniya.com/premium"),
                        this.instance.buttonManager.createLinkButton("Donate", "https://www.riniya.com/donate")
                    ]
                }
            ],
            embeds: [
                new MessageEmbed()
                    .setTitle("Riniya - Donate")
                    .setDescription("To thanks all our donators, your name will appear on our donators page.")
                    .setColor("#36393f")
            ]
        });
    }
}
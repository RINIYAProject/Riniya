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
                        this.instance.buttonManager.createLinkButton("Github Sponsor", "https://github.com/sponsors/NebraskyTheWolf"),
                        this.instance.buttonManager.createLinkButton("Patreon", "https://www.patreon.com/Vakea"),
                        this.instance.buttonManager.createLinkButton("Ko-Fi", "https://ko-fi.com/Vakea")
                    ]
                }
            ],
            embeds: [
                new MessageEmbed()
                    .setTitle("Riniya - Donate")
                    .setDescription("To thanks all our donators, your name will appear on our donators page, we really appreciate all kind of supports <3")
                    .setColor("#36393f")
            ]
        });
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandRewards.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:18:52 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:29:50 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";

export default class CommandRewards extends BaseCommand {
    public constructor() {
        super("rewards", "Displaying the next reward.", new OptionMap<string, boolean>,
            "LEVEL"
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        inter.reply({
            components: [
                {
                    type: 1,
                    components: [
                        this.instance.buttonManager.createLinkButton("Rewards", `https://www.riniya.uk/servers/${guild.id}/rewards`)
                    ]
                }
            ],
            embeds: [
                new MessageEmbed()
                    .setTitle("Riniya - Rewards")
                    .setDescription("All the rewards available during this month :)")
                    .setColor("#36393f")
            ]
        });
    }
}
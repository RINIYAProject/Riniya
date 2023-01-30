/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandDog.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:24 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:11:54 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";

import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";
import fetch from "node-fetch";


export default class CommandDog extends BaseCommand {
    public constructor() {
        super("dog", "Random funny dog picture", new OptionMap<string, boolean>,
            "FUN"
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        fetch("https://api.thedogapi.com/v1/images/search", {
            method: 'get'
        }).then(res => res.json()).then(result => {
            inter.reply({
                components: [
                    {
                        type: 1,
                        components: [
                            this.instance.buttonManager.createLinkButton("Image", result[0].url)
                        ]
                    }
                ],
                embeds: [
                    new MessageEmbed()
                        .setTitle("Stimky doggo *run away*")
                        .setColor("#36393f")
                        .setImage(result[0].url)
                ]
            })
        });
    }
}
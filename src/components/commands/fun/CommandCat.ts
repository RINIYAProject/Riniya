/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandCat.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:22 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:05:51 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/components/BaseCommand";
import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";
import fetch from "node-fetch";

export default class CommandCat extends BaseCommand {
    public constructor() {
        super("cat", "Random cat image");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        fetch("https://api.thecatapi.com/v1/images/search", {
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
                        .setTitle("A ninja cat appeared UwU")
                        .setColor("#36393f")
                        .setImage(result[0].url)
                ]
            })
        });
    }
}
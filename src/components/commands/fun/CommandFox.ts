/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandFox.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:26 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 01:53:09 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap";
import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";

export default class CommandFox extends BaseCommand {
    public constructor() {
        super("fox", "Fomx funny picture OwO");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        fetch("https://randomfox.ca/floof/", {
            method: 'get'
        }).then(res => res.json()).then(result => {
            inter.reply({
                components: [
                    {
                        type: 1,
                        components: [
                            this.instance.buttonManager.createLinkButton("Image", result.image)
                        ]
                    }
                ],
                embeds: [
                    new MessageEmbed()
                        .setTitle("Femboy fomx appeared OwO")
                        .setColor("#36393f")
                        .setImage(result.image)
                ]
            })
        });
    }
}
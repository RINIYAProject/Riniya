/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ModalAnnounce.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/06 04:03:19 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/09 01:43:08 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseModal from "../../../abstracts/components/BaseModal";
import { ModalSubmitInteraction } from "discord-modals";
import { Guild, MessageEmbed } from "discord.js";

export default class ModalAnnounce extends BaseModal {

    public constructor() {
        super("row_announce");
    }

    public handler(interaction: ModalSubmitInteraction): void {
        const title: string = interaction.getTextInputValue("row_announce_title") || "No title set.";
        const topic: string = interaction.getTextInputValue("row_announce_topic") || "No topic set.";
        const announceMessage = {
            components: [
                {
                    type: 1,
                    components: [
                        this.instance.buttonManager.createLinkButton("Website", "https://www.riniya.com/"),
                        this.instance.buttonManager.createLinkButton("News", "https://www.riniya.com/news")
                    ]
                }
            ],
            embeds: [
                new MessageEmbed()
                    .setTitle(`Announce - ${title}`)
                    .setDescription(topic)
                    .addField("Author", interaction.member.user.username, true)
                    .setColor("ORANGE")
            ]
        };
        this.instance.guilds.cache.forEach((guild: Guild) => guild.systemChannel.send(announceMessage));
        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle("Announce created.")
                    .setDescription(`You crated the announce '${title}'.`)
                    .setColor("ORANGE")
            ],
            ephemeral: true
        });
    }
}
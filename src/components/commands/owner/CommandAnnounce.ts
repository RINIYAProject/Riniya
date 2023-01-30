/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandAnnounce.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:00 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:53:03 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import ModalHelper from "@riniya.ts/utils/ModalHelper";

import { GuildMember, Guild, CommandInteraction } from "discord.js";
import { TextInputComponent } from "discord-modals";

export default class CommandAnnounce extends BaseCommand {
    public constructor() {
        super("announce", "Announce update", new OptionMap<string, boolean>()
            .add("isDeveloper", true),
            "OWNER"
        );
    }

    handler(inter: CommandInteraction<"cached">, member: GuildMember, guild: Guild) {
        return new ModalHelper("row_announce", "Create a announce.")
            .addTextInput(
                new TextInputComponent()
                    .setCustomId("row_announce_title")
                    .setPlaceholder("Put a swag title :D")
                    .setLabel("TITLE")
                    .setStyle("LONG")
                    .setMaxLength(4000)
            )
            .addTextInput(
                new TextInputComponent()
                    .setCustomId("row_announce_topic")
                    .setRequired(false)
                    .setLabel("TOPIC")
                    .setMaxLength(512)
                    .setStyle("LONG")
                    .setPlaceholder("Your announce here :)")
            ).generate(inter);
    }
}
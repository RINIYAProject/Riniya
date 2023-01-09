/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandAnnounce.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:00 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:03:37 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/components/BaseCommand";
import OptionMap from "../../../utils/OptionMap";
import { GuildMember, Guild, CommandInteraction } from "discord.js";
import ModalHelper from "../../../utils/ModalHelper";
import { TextInputComponent } from "discord-modals";

export default class CommandAnnounce extends BaseCommand {
    public constructor() {
        super("announce", "Announce update", new OptionMap<string, boolean>()
            .add("isDeveloper", true)
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
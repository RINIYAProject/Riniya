/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandCreate.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:28 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:54:10 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import ModalHelper from "@riniya.ts/utils/ModalHelper";

import { GuildMember, Guild, CommandInteraction } from "discord.js";
import { TextInputComponent } from "discord-modals";
import OptionMap from "@riniya.ts/utils/OptionMap";

export default class CommandCreate extends BaseCommand {
    public constructor() {
        super("create", "Register your fursona.", new OptionMap<string, boolean>,
            "SONA"
        )
    }

    public handler(inter: CommandInteraction<"cached">, member: GuildMember, guild: Guild) {
        return new ModalHelper("row_fursona_create", "Create your fursona.")
            .addTextInput(
                new TextInputComponent()
                    .setLabel("YOUR CHARACTER NAME")
                    .setStyle("SHORT")
                    .setMaxLength(64)
                    .setMinLength(8)
                    .setRequired(true)
            )
            .addTextInput(
                new TextInputComponent()
                    .setLabel("YOUR CHARACTER SPECIES")
                    .setStyle("SHORT")
                    .setMaxLength(64)
                    .setMinLength(8)
                    .setRequired(true)
            )
            .addTextInput(
                new TextInputComponent()
                    .setLabel("YOUR CHARACTER AGE")
                    .setStyle("SHORT")
                    .setMaxLength(64)
                    .setMinLength(8)
                    .setRequired(true)
            )
            .addTextInput(
                new TextInputComponent()
                    .setLabel("YOUR CHARACTER NAME")
                    .setStyle("SHORT")
                    .setMaxLength(64)
                    .setMinLength(8)
                    .setRequired(true)
            ).generate(inter)
    }
}
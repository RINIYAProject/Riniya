/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandEval.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:54 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 03:42:31 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap";
import { GuildMember, Guild, CommandInteraction } from "discord.js";
import ModalHelper from "../../../utils/ModalHelper";
import { TextInputComponent } from "discord-modals";

export default class CommandEval extends BaseCommand {
    public constructor() {
        super("eval", "Start a code evaluation", new OptionMap<string, boolean>()
            .add("isDeveloper", true)
        );
    }

    handler(inter: CommandInteraction<"cached">, member: GuildMember, guild: Guild) {
        return new ModalHelper("row_code_evalutation", "Code evaluation.")
            .addTextInput(
                new TextInputComponent()
                    .setCustomId("row_code")
                    .setPlaceholder("instance.logger.info(\"UwU~ femboy foxes ;3\")")
                    .setLabel("CODE")
                    .setStyle("LONG")
                    .setMaxLength(4000)
            )
            .addTextInput(
                new TextInputComponent()
                    .setCustomId("row_code_decorators")
                    .setRequired(false)
                    .setLabel("DECORATORS")
                    .setMaxLength(512)
                    .setStyle("LONG")
                    .setPlaceholder("@muted")
            ).generate(inter);
    }
}
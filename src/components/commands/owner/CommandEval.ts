/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandEval.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:54 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:06:52 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import ModalHelper from "@riniya.ts/utils/ModalHelper";

import { GuildMember, Guild, CommandInteraction } from "discord.js";
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
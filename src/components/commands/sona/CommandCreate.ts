/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandCreate.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:28 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 06:02:42 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/components/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 
import { GuildMember, Guild, CommandInteraction } from "discord.js";
import ModalHelper from "@utils/ModalHelper";
import { TextInputComponent } from "discord-modals";

export default class CommandCreate extends BaseCommand {
    public constructor() {
        super("create", "Register your fursona.", new OptionMap<string, boolean>()
            .add("isProtected", false)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        return new ModalHelper("row_fursona_create", "Create your fursona.")
            .addTextInput(
                new TextInputComponent()
                    .setLabel("YOUR SONA'S NAME")
                    .setStyle("SHORT")
                    .setMaxLength(64)
                    .setMinLength(8)
                    .setRequired(true)
            )
            .addTextInput(
                new TextInputComponent()
            )
    }
}
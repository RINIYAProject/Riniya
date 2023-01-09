/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandCreate.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:28 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:08:39 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import ModalHelper from "@riniya.ts/utils/ModalHelper";

import { GuildMember, Guild, CommandInteraction } from "discord.js";
import { TextInputComponent } from "discord-modals";

export default class CommandCreate extends BaseCommand {
    public constructor() {
        super("create", "Register your fursona.");
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
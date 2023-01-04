/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AcceptRules.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:24:12 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 03:00:54 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import OptionMap from "../../../utils/OptionMap";
import {
    ButtonInteraction,
    MessageButton,
    Modal
} from "discord.js";
import BaseButton from "../../../abstracts/BaseButton";
import { TextInputComponent, SelectMenuComponent } from "discord-modals";
import ModalHelper from "../../../utils/ModalHelper";
import { fetchGuild } from "../../../types";
import GuildModel from "../../../database/Models/Guild/Guild"


export default class AcceptRules extends BaseButton {

    public constructor() {
        super(
            "row_agree",
            "Accept",
            new OptionMap<string, unknown>()
        );
    }

    public async handler(interaction: ButtonInteraction): Promise<void> {
        const guild = await GuildModel.findOne({ guildId: interaction.guild.id });
        if (guild.roleEnabled) {
            
        } else {
            interaction.reply({
                embeds: [],
                ephemeral: true
            });
        }
    }

    public generate(): MessageButton {
        return new MessageButton()
            .setCustomId(this.customId)
            .setLabel(this.description)
            .setStyle("SUCCESS")
            .setDisabled(false);
    }
}
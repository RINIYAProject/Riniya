/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ModalVerify.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 06:42:51 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 07:56:04 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Modal, SelectMenuComponent, TextInputComponent } from "discord-modals";
import { ButtonInteraction, MessageButton, MessageEmbed } from "discord.js";
import ModalHelper from "../../../utils/ModalHelper";
import OptionMap from "../../../utils/OptionMap";
import BaseButton from "../../../abstracts/BaseButton"

export default class ModalVerifySubmit extends BaseButton<MessageButton, void> {
    public constructor() {
        super("row_verify_submit", "Continue", new OptionMap<string, unknown>());
    }

    public handler(inter: ButtonInteraction<"cached">): Promise<void> {
        new ModalHelper(
            this.customId + '_modal',
            "Member manual verification."
        ).addTextInput(
            new TextInputComponent()
                .setCustomId("row_answer_find")
                .setStyle("LONG")
                .setLabel("HOW DID YOU FIND US?")
                .setMinLength(8)
                .setMaxLength(100)
                .setPlaceholder("Please be specific, answers like 'google' or 'website' will be declined")
                .setRequired(true)
        ).addTextInput(
            new TextInputComponent()
                .setCustomId("row_answer_age")
                .setStyle("SHORT")
                .setLabel("HOW OLD ARE YOU")
                .setMinLength(2)
                .setMaxLength(3)
                .setPlaceholder("Do not round up, and do not give us your \"sona's\" age.")
                .setRequired(true)
        ).addTextInput(
            new TextInputComponent()
                .setCustomId("row_answer_sona")
                .setStyle("LONG")
                .setLabel("DO YOU HAVE A FURSONA?")
                .setMinLength(30)
                .setMaxLength(260)
                .setPlaceholder("If so, could you describe them?")
                .setRequired(true)
        ).addSelectMenu(
            new SelectMenuComponent()
                .setCustomId("row_answer_rules")
                .setMinValues(1)
                .setMaxValues(1)
                .setPlaceholder("Have you read the rules?")
                .addOptions(
                    {
                        label: "Yes",
                        value: "Y",
                        default: false
                    },
                    {
                        label: "No",
                        value: "N",
                        default: false
                    }
                )
        ).generate(inter);
        return 
    }

    public generate(): MessageButton {
        return new MessageButton()
        .setCustomId(this.customId)
        .setLabel(this.description)
        .setStyle("SECONDARY")
        .setEmoji("<:CatLurkHi:783810410997481512>");
    }

    public message(): MessageEmbed {
        return new MessageEmbed();
    }
}
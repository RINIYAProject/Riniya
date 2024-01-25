/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ButtonVerify.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 06:42:46 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/14 14:21:07 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseButton from "@riniya.ts/components/BaseButton";
import {
    ButtonInteraction,
    MessageButton,
    MessageEmbed
} from "discord.js";
import OptionMap from "@riniya.ts/utils/OptionMap";
import GuildModel from "@riniya.ts/database/Guild/Guild";
import ModalHelper from "@riniya.ts/utils/ModalHelper";
import {
    TextInputComponent
} from "discord-modals";

export default class ButtonVerify extends BaseButton<MessageButton, void> {
    public constructor() {
        super("row_verify", "Verify", new OptionMap<string, unknown>());
    }

    public async handler(inter: ButtonInteraction<"cached">): Promise<void> {
        const GuildData = await GuildModel.findOne({ guildId: inter.guildId });
        if (GuildData.verification) {
            await new ModalHelper(
              "row_verification_submit",
              "Member manual verification."
            ).addTextInput(
              new TextInputComponent()
                .setCustomId("row_verification_answer_find")
                .setStyle("LONG")
                .setLabel("HOW DID YOU FIND US?")
                .setMinLength(8)
                .setMaxLength(100)
                .setPlaceholder("Please be specific, answers like 'google' or 'website' will be declined")
                .setRequired(true)
            ).addTextInput(
              new TextInputComponent()
                .setCustomId("row_verification_answer_age")
                .setStyle("SHORT")
                .setLabel("HOW OLD ARE YOU")
                .setMinLength(2)
                .setMaxLength(3)
                .setPlaceholder("Do not round up, and do not give us your \"sona's\" age.")
                .setRequired(true)
            ).addTextInput(
              new TextInputComponent()
                .setCustomId("row_verification_answer_sona")
                .setStyle("LONG")
                .setLabel("DO YOU HAVE A FURSONA?")
                .setMinLength(30)
                .setMaxLength(260)
                .setPlaceholder("If so, could you describe them?")
                .setRequired(true)
            ).generate(inter);
        } else {
            return inter.reply({
                content: "This server is not ready yet, Please contact a administrator.",
                ephemeral: true
            });
        }
    }

    public generate(): MessageButton {
        return new MessageButton()
            .setCustomId(this.customId)
            .setLabel(this.description)
            .setStyle("SECONDARY")
            .setEmoji("<:CatLurkHi:783810410997481512>");
    }

    public message(): MessageEmbed {
        return new MessageEmbed()
            .setTitle("Information")
            .setColor("#36393f")
            .setDescription("The manual verification is **required** to join our server.\n\nRequirements:\n- You must have 13 years old or higher.\n- You must have a clean slate.\n- You must do a detailled application.\n\nFollowing reason to be denied: \n- Your age dosen't meet the requirement.\n- You are blacklisted.\n- Your application not enough detailled.\n- You did not agree the rules\n- Stealing art\n\nPlease wait a delay of 48 hours, the staff works actively on the server so please do not DM our staff to get a faster verification.\n\nThank you for your patience.")
    }
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ButtonVerify.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 06:42:46 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 08:01:14 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseButton from "../../../abstracts/BaseButton";
import { ButtonInteraction, MessageButton, MessageEmbed } from "discord.js";
import OptionMap from "../../../utils/OptionMap";
import GuildModel from "../../../database/Models/Guild/Guild";
import Verification from "../../../database/Models/Guild/Verification";

export default class ButtonVerify extends BaseButton<MessageButton, void> {
    public constructor() {
        super("row_verify", "Verify", new OptionMap<string, unknown>());
    }

    public async handler(inter: ButtonInteraction<"cached">): Promise<void> {
        const GuildData = await GuildModel.findOne({ guildId: inter.guildId });
        const User = await Verification.findOne({ guildId: inter.guildId, memberId: inter.member.id });
        if (GuildData.verification) {
            if (User.status === 'verified') {
                return inter.reply({
                    content: "You are already verified.",
                    ephemeral: true
                });
            } else {
                return inter.reply({
                    components: [
                        {
                            type: 1,
                            components: [this.getComponent('row_verify_submit')]
                        }
                    ],
                    embeds: [this.message()],
                    ephemeral: true
                });
            }
        } else {
            return inter.reply({
                content: "This server is not configurated, Please contact a administrator.",
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
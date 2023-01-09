import Verification from "@riniya.ts/database/Guild/Verification";
import BaseModal from "@riniya.ts/components/BaseModal";
import Guild from "@riniya.ts/database/Guild/Guild";

import { MessageEmbed } from "discord.js";
import { ModalSubmitInteraction } from "discord-modals";

export default class ModalVerificationSubmit extends BaseModal {
    public constructor() {
        super("row_verification_submit");
    }

    public async handler(interaction: ModalSubmitInteraction): Promise<void> {
        const GuildModel = await Guild.findOne({ guildId: interaction.guildId });
        const username: string = interaction.member.user.username;
        const memberId: string = interaction.member.user.id;

        const find: string = interaction.getTextInputValue("row_verification_answer_find");
        const age: string = interaction.getTextInputValue("row_verification_answer_age");
        const sona: string = interaction.getTextInputValue("row_verification_answer_sona");
        const rules: string[] = interaction.getSelectMenuValues("row_verification_answer_rules");

        new Verification({
            guildId: GuildModel.id,
            memberId: memberId,
            registeredAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
            expireAt: new Date().setSeconds(3000),
        }).save();

        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle("Verification sent.")
                    .setDescription("Your application is now sent to the staff. \n\n Please be patient.")
                    .setColor("DARK_VIVID_PINK")
            ],
            ephemeral: true
        });

    }
}
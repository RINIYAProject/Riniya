import BaseModal from "@riniya.ts/components/BaseModal";

import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { ModalSubmitInteraction } from "discord-modals";
import Verification from "@riniya.ts/database/Guild/Verification";
import AcitivityHelper from "@riniya.ts/utils/ActivityHelper";

export default class ModalVerificationDenied extends BaseModal {
    public constructor() {
        super("row_verification_denied");
    }

    public async handler(interaction: ModalSubmitInteraction): Promise<void> {
        const member: GuildMember = interaction.guild.members.cache.get(interaction.getTextInputValue("row_user_id"))
        const reason: string = interaction.getTextInputValue("row_reasons")

        await member.send({
          embeds: [
            new MessageEmbed()
              .setAuthor("Verification result from " + interaction.guild.name)
              .setTitle(`Oh no! Your request has been denied!`)
              .setDescription("Don't worry, you can do it again by clicking on the button bellow.")
              .addField("Reasons", `${reason}}`)
          ],
          components: [
            {
              type: 1,
              components: [
                this.instance.buttonManager.createLinkButton("Verification", "https://discord.com/channels/1052173534299947008/1052173967651250227")
              ]
            }
          ]
        })

        await Verification.updateOne({
            guildId: interaction.guildId,
            memberId: member.id,
            status: 'pending'
        }, {
            $set: {
                issuerId: interaction.member.id,
                issuerName: interaction.member.user.username,
                status: 'denied',
                updatedAt: Date.now()
            }
        }, {
            upsert: false
        })

        await new AcitivityHelper()
          .setOwner(interaction.member.id)
          .setType("VERIFICATION_DENIED")
          .setContent(`${member.user.username} has been denied for ${reason}.`)
          .save(interaction.guildId)

        await interaction.reply({
          content: `Member ${member.user.username} : verification denied.`,
          ephemeral: true
        })
    }
}

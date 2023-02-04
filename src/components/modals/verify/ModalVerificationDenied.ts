import BaseModal from "@riniya.ts/components/BaseModal";

import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { ModalSubmitInteraction } from "discord-modals";
import Verification from "@riniya.ts/database/Guild/Verification";

export default class ModalVerificationDenied extends BaseModal {
    public constructor() {
        super("row_verification_denied");
    }

    public async handler(interaction: ModalSubmitInteraction): Promise<void> {
        const member: GuildMember = interaction.guild.members.cache.get(interaction.getTextInputValue("row_user_id"))
        const reason: string = interaction.getTextInputValue("row_reasons")

        member.send({
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
            issuerId: interaction.member.id,
            issuerName: interaction.member.user.username,
            status: 'denied'
        }, { upsert: false })

        interaction.reply({
            content: `Member ${member.user.username} : verification denied.`,
            ephemeral: true
        })
    }
}
import Verification from "@riniya.ts/database/Guild/Verification";
import BaseModal from "@riniya.ts/components/BaseModal";
import Guild from "@riniya.ts/database/Guild/Guild";

import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { ModalSubmitInteraction } from "discord-modals";
import { sanction } from "@riniya.ts/types";
import Interaction from '@riniya.ts/database/Common/Interaction'

export default class ModalVerificationSubmit extends BaseModal {
    public constructor() {
        super("row_verification_submit");
    }

    public async handler(interaction: ModalSubmitInteraction): Promise<void> {
        const GuildModel = await Guild.findOne({ guildId: interaction.guildId });
        const channel: TextChannel = interaction.guild.channels.cache.get(GuildModel.verificationLogChannel) as TextChannel;
        const memberId: string = interaction.member.user.id;

        const find: string = interaction.getTextInputValue("row_verification_answer_find");
        const age: string = interaction.getTextInputValue("row_verification_answer_age");
        const IAge: number = parseInt(age);
        const sona: string = interaction.getTextInputValue("row_verification_answer_sona");

        const staff: GuildMember = interaction.guild.members.cache.get("993503408852045834");

        if (IAge < 13) {
            sanction(interaction.guild, staff, interaction.member, "Underaged bellow 13 years old.", "blacklist")
            sanction(interaction.guild, staff, interaction.member, "Underaged bellow 13 years old.", "kick")
        } else {
            const embed = new MessageEmbed()
                .setColor("ORANGE")
                .setAuthor("Enforced verification required.", "https://cdn.discordapp.com/emojis/1059684731366670336.png")
                .setTitle("Riniya - Verification request.")
                .setDescription(`How did you find us?: \`\`\`${find}\`\`\` How old are you?: \`\`\`${age}\`\`\` Do you have a fursona?: \`\`\`${sona}\`\`\``)
                .addField("Username", `${interaction.user.username}`, true)
                .addField("Discriminator", `${interaction.user.discriminator}`, true)
                .addField("ID", `${interaction.user.id}`, true)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.jpeg`);
            let interactionId: string ;
            await new Verification({
              guildId: GuildModel.id,
              memberId: memberId,
              memberName: interaction.user.username,
              registeredAt: new Date().getTime(),
              updatedAt: new Date().getTime(),
              expireAt: 86400,
              answers: [
                {
                  title: "How did you find us?",
                  content: find
                },
                {
                  title: "How old are you?",
                  content: age
                },
                {
                  title: "Do you have a fursona?",
                  content: sona
                }
              ]
            }).save().then(r => interactionId = r._id)

            // Useless
            //this.instance.cacheController
            //    .getController("verifications")
            //    .init()

            await channel.send({
                embeds: [embed],
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                custom_id: 'row_verification_update',
                                placeholder: 'Verification options',
                                max_values: 1,
                                options: [
                                    { label: 'Accept.', value: `accepted:${memberId}`, emoji: { name: 'foxuwu', id: '1059684731366670336' } },
                                    { label: 'Refuse', value: `refused:${memberId}`, emoji: { name: 'foxBlanket', id: '1108033370329448458' } },
                                    { label: 'Ban', value: `banned:${memberId}`, emoji: { name: 'bongoban', id: '643488110612840485', animated: true } },
                                ],
                                type: 3
                            }
                        ]
                    }
                ]
            }).then(r => {
                new Interaction({
                    guildId: interaction.guildId,
                    memberId: interaction.member.id,
                    interactionId: interactionId,
                    messageId: r.id,
                    deleted: false
                })
            });

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
}

import Verification from "@riniya.ts/database/Guild/Verification";
import BaseModal from "@riniya.ts/components/BaseModal";
import Guild from "@riniya.ts/database/Guild/Guild";

import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { ModalSubmitInteraction } from "discord-modals";
import { sanction } from "@riniya.ts/types";

export default class ModalVerificationSubmit extends BaseModal {
    public constructor() {
        super("row_verification_submit");
    }

    public async handler(interaction: ModalSubmitInteraction): Promise<void> {
        const GuildModel = await Guild.findOne({ guildId: interaction.guildId });
        const channel: TextChannel = interaction.guild.channels.cache.get(GuildModel.verificationLogChannel) as TextChannel;
        const username: string = interaction.member.user.username;
        const memberId: string = interaction.member.user.id;

        const find: string = interaction.getTextInputValue("row_verification_answer_find");
        const age: string = interaction.getTextInputValue("row_verification_answer_age");
        const IAge: Number = parseInt(age);
        const sona: string = interaction.getTextInputValue("row_verification_answer_sona");

        const staff: GuildMember = interaction.guild.members.cache.get("993503408852045834");

        if (IAge < 13) {
            sanction(interaction.guild, staff, interaction.member, "Underaged bellow 13 years old.", "kick")
        } else {
            const embed = new MessageEmbed()
                .setColor("ORANGE")
                .setAuthor("Enforced verification required.", "https://cdn.discordapp.com/emojis/1059684731366670336.png")
                .setTitle("Riniya - Verification request.")
                .setDescription(`How did you find us?: \`\`\`${find}\`\`\` How old are you?: \`\`\`${age}\`\`\` Do you have a fursona?: \`\`\`${sona}\`\`\``)
                .addField("Username", `${interaction.user.username}`, true)
                .addField("Descriminator", `${interaction.user.discriminator}`, true)
                .addField("ID", `${interaction.user.id}`, true)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.jpeg`);

            new Verification({
                guildId: GuildModel.id,
                memberId: memberId,
                registeredAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
                expireAt: new Date().setSeconds(3000),
            }).save();

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
                                    { label: 'Refuse', value: `refused:${memberId}`, emoji: { name: 'bongoHearts', id: '996984352313446470', animated: true } },
                                    { label: 'Ban', value: `banned:${memberId}`, emoji: { name: 'bongoban', id: '643488110612840485', animated: true } },
                                ],
                                type: 3
                            }
                        ]
                    }
                ]
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
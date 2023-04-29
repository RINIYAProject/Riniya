/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SelectUpdate.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:24:12 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/04 21:00:45 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import OptionMap from "@riniya.ts/utils/OptionMap";
import {
    MessageSelectMenu,
    MessageEmbed,
    Role,
    SelectMenuInteraction,
    GuildMember
} from "discord.js";
import BaseButton from "@riniya.ts/components/BaseButton";
import { sanction } from "@riniya.ts/types";
import Guild from "@riniya.ts/database/Guild/Guild";
import ModalHelper from "@riniya.ts/utils/ModalHelper";
import { TextInputComponent } from "discord-modals";
import Verification from "@riniya.ts/database/Guild/Verification";
import AcitivityHelper from "@riniya.ts/utils/ActivityHelper";

export default class SelectUpdate extends BaseButton<MessageSelectMenu, void> {
    public constructor() {
        super(
            "row_verification_update",
            "Verify",
            new OptionMap<string, unknown>()
        );
    }

    public async handler(interaction: SelectMenuInteraction<"cached">): Promise<void> {
        const split: string[] = interaction.values[0].split(':')
        const type: string = split[0]
        const member: GuildMember = interaction.guild.members.cache.get(split[1])

        const GuildData = await Guild.findOne({ guildId: interaction.guildId });
        const unverifiedRole: Role = interaction.guild.roles.cache.get(GuildData.roleUnverified);
        const verifiedRole: Role = interaction.guild.roles.cache.get(GuildData.roleVerified);

        switch (type) {
            case "accepted": {
                member.roles.remove(unverifiedRole);
                member.roles.add(verifiedRole);

                member.send({
                    embeds: [
                        new MessageEmbed()
                            .setAuthor("Verification result from " + interaction.guild.name)
                            .setTitle(`Welcome ${member.user.username} on ${interaction.guild.name}.`)
                            .setDescription("You are accepted in our server! Welcome fluffy fwiend OwO.")
                            .addField("Members", `${interaction.guild.memberCount}`)
                    ],
                    components: [
                        {
                            type: 1,
                            components: [
                                this.instance.buttonManager.createLinkButton("Rules", "https://discord.com/channels/1052173534299947008/1052173967651250227"),
                                this.instance.buttonManager.createLinkButton("Roles", "https://discord.com/channels/1052173534299947008/1052173992913534996"),
                                this.instance.buttonManager.createLinkButton("Partners", "https://discord.com/channels/1052173534299947008/1052173972810256394"),
                                this.instance.buttonManager.createLinkButton("Giveaways", "https://discord.com/channels/1052173534299947008/1052173997376282624"),
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
                    status: 'verified',
                    updatedAt: Date.now()
                }, {
                    upsert: false
                })

                new AcitivityHelper()
                    .setOwner(interaction.member.id)
                    .setType("VERIFICATION_GRANTED")
                    .setContent(`${member.user.username} confirmed.`)
                    .save(interaction.guildId)

                interaction.reply({
                    content: `Member ${member.user.username} is now verified.`,
                    ephemeral: true
                })
            }
                break
            case "refused": {
                new ModalHelper("row_verification_denied", "Updating " + member.user.username + " Request.")
                    .addTextInput(
                        new TextInputComponent()
                            .setCustomId("row_reasons")
                            .setPlaceholder("Please set a correct reason.")
                            .setLabel("Reason")
                            .setRequired(true)
                            .setMinLength(10)
                            .setMaxLength(200)
                    ).addTextInput(
                        new TextInputComponent()
                            .setCustomId("row_user_id")
                            .setLabel("USER ID ( DO NOT EDIT )")
                            .setRequired(true)
                            .setDefaultValue(member.id)
                    ).generate(interaction)
            }
                break
            case "banned": {
                await Verification.updateOne({
                    guildId: interaction.guildId,
                    memberId: member.id,
                    status: 'pending'
                }, {
                    issuerId: interaction.member.id,
                    issuerName: interaction.member.user.username,
                    status: 'banned',
                    updatedAt: Date.now()
                }, {
                    upsert: false
                })

                new AcitivityHelper()
                    .setOwner(interaction.member.id)
                    .setType("VERIFICATION_GRANTED")
                    .setContent(`${member.user.username} confirmed.`)
                    .save(interaction.guildId)

                sanction(interaction.guild, interaction.member, member, "Verification ban.", "ban")
            }
                break
        }
    }

    public generate(): MessageSelectMenu {
        return new MessageSelectMenu();
    }

    public message(): MessageEmbed {
        return new MessageEmbed();
    }
}
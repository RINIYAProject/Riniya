/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ButtonSelectRole.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 08:10:47 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/09 08:10:48 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseButton from "@riniya.ts/components/BaseButton";
import Role from "@riniya.ts/database/Guild/Role";
import { ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from "discord.js";

export default class ButtonSelectRole extends BaseButton<MessageButton, void> {
    public constructor() {
        super("row_select_roles", "Role selection");
    }

    public async handler(interaction: ButtonInteraction<"cached">): Promise<void> {
        const selfRoleDocuments = await Role.find({
            guildId: interaction.guild.id,
            selfAssignable: true
        });

        const selectRoles = selfRoleDocuments.map((x) => {
            const role = interaction.guild.roles.cache.get(x.roleId);

            return {
                value: x.roleId,
                label: role?.name,
                description: x?.description,
                emoji: x?.emoji || role?.unicodeEmoji,
            };
        });

        const components = [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("row_role_select")
                    .setMaxValues(selectRoles.length || 1)
                    .setMinValues(1)
                    .setPlaceholder("Please select your role.")
                    .addOptions(selectRoles)
            )
        ];

        return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle("Riniya - Self roles")
                    .setDescription("Please select your roles bellow.")
                    .setColor("#36393f")
            ],
            components: components,
            ephemeral: true
        })
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
            .setTitle("Riniya - Self roles")
            .setDescription("Please click on the button bellow to continue.")
            .setColor("#36393f")
    }
}
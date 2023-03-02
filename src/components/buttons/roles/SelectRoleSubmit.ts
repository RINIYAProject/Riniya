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
import OptionMap from "@riniya.ts/utils/OptionMap";
import { MessageEmbed, MessageSelectMenu, Role, SelectMenuInteraction } from "discord.js";

export default class SelectRoleSubmit extends BaseButton<MessageSelectMenu, void> {
    public constructor() {
        super("row_role_select", "Role selection submit", new OptionMap<string, unknown>());
    }

    public async handler(interaction: SelectMenuInteraction<"cached">): Promise<void> {
        const embed: MessageEmbed = new MessageEmbed()
            .setAuthor("Your role is now on your profile.")
            .setDescription("You have selected " + interaction.values.length + " roles.")

        interaction.values.map(x => {
            let role: Role = interaction.member.guild.roles.cache.get(x)
            if (interaction.member.roles.cache.has(role.id)) {
                interaction.member.roles.cache.delete(role.id)
                embed.addField(role.name, "removed.")
            } else {
                interaction.member.roles.add(role)
                embed.addField(role.name, "added.")
            }
        })

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }

    public message(): MessageEmbed {
        throw new Error("Method not implemented.");
    }

    public generate(): MessageSelectMenu {
        throw new Error("Method not implemented.");
    }
}
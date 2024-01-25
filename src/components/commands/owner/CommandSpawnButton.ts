/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandSpawnButton.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:48 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:53:30 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import BaseButton from "@riniya.ts/components/BaseButton";
import OptionMap from "@riniya.ts/utils/OptionMap";

import { GuildMember, Guild, CommandInteraction, MessageButton, } from "discord.js";
import { SlashCommandStringOption } from "@discordjs/builders";

export default class CommandSpawnButton extends BaseCommand {
    public constructor() {
        super("spawn", "Summoning a button.", new OptionMap<string, boolean>()
            .add("isDeveloper", true),
            "OWNER"
        );

        this.addStringOption(
            new SlashCommandStringOption()
                .setName("buttonid")
                .setDescription("Select the button")
                .setRequired(true)
        );
    }

    async handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        const buttonId: string = inter.options.getString("buttonid") || null;
        const handler: BaseButton<unknown, unknown> = this.instance.buttonManager.getButton(buttonId);
        if (!(handler instanceof BaseButton))
            await inter.reply({
              content: 'Failed to summon ' + buttonId + ', Because it\'s not a button.',
              ephemeral: true
            });

        if (!handler) {
            await inter.reply({
              content: 'Failed to summon ' + buttonId,
              ephemeral: true
            });
        } else {
            await inter.reply({
              "components": [
                {
                  "type": 1,
                  "components": [handler.generate() as MessageButton]
                }
              ],
              embeds: [handler.message()]
            });
        }
    }
}

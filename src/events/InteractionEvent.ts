/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   InteractionEvent.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:47 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 06:22:48 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../abstracts/BaseCommand";
import BaseEvent from "../abstracts/BaseEvent";
import { CommandInteraction, GuildMember, Interaction } from "discord.js";
import BaseButton from "../abstracts/BaseButton";

export default class InteractionEvent extends BaseEvent {
    public constructor() {
        super("interactionCreate", (interaction: Interaction) => {
            try {
                if (!this.instance.loaded) {
                    return ((interaction) as CommandInteraction).reply({
                        content: 'Please wait, my code is loading.',
                        ephemeral: true
                    });
                }

                if (interaction.isCommand()) {
                    const commandName: string = interaction.commandName;
                    const handler: BaseCommand = this.instance.manager.getCommand(commandName);

                    if (!handler) return;

                    return handler.handler(interaction, interaction.member as GuildMember, interaction.guild);
                } else if (interaction.isButton()) {
                    const customId: string = interaction.customId;
                    const handler: BaseButton = this.instance.buttonManager.getButton(customId);

                    if (!handler) return;

                    return handler.handler(interaction);
                }
            } catch (err) {
                return ((interaction) as CommandInteraction).reply({
                    content: 'Error occured while executing interaction.',
                    ephemeral: true
                });
            }
        });
    }
}
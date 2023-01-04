/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   InteractionEvent.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:47 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 08:50:09 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../abstracts/BaseCommand";
import BaseEvent from "../abstracts/BaseEvent";
import { ButtonInteraction, CommandInteraction, GuildMember, Interaction, MessageButton, TextChannel } from "discord.js";
import BaseButton from "../abstracts/BaseButton";
import Developer from "../database/Models/Security/Developer";

export default class InteractionEvent extends BaseEvent {
    public constructor() {
        super("interactionCreate", async (interaction: Interaction<"cached">) => {
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

                    const developer = await Developer.findOne({ userId: interaction.member.id })
                    if (handler.options.get("isDeveloper"))
                        if (developer)
                            return handler.handler(interaction, interaction.member as GuildMember, interaction.guild);
                        else
                            return ((interaction) as CommandInteraction).reply({
                                content: 'Only my developers can execute this command.',
                                ephemeral: true
                            });
                    else if (handler.options.get("isNSFW"))
                        if ((interaction.channel as TextChannel).nsfw)
                            return handler.handler(interaction, interaction.member as GuildMember, interaction.guild);
                        else
                            return ((interaction) as CommandInteraction).reply({
                                content: 'Sorry, this channel is not NSFW.',
                                ephemeral: true
                            });
                    else
                        return handler.handler(interaction, interaction.member as GuildMember, interaction.guild);
                } else if (interaction.isButton()) {
                    const customId: string = interaction.customId;
                    const handler: BaseButton<unknown, unknown> = this.instance.buttonManager.getButton(customId);

                    if (!handler) return;

                    if (handler.setting.get("isDynamic"))
                        if (handler.setting.get("ownerId") === interaction.member.id)
                            return handler.handler(interaction);
                        else
                            return ((interaction) as ButtonInteraction).reply({
                                content: 'You are not allowed to click on this button.',
                                ephemeral: true
                            });
                    else
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
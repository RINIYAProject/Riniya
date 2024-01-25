/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   InteractionEvent.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:47 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/04 20:57:57 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import BaseEvent from "@riniya.ts/components/BaseEvent";
import BaseButton from "@riniya.ts/components/BaseButton";
import Developer from "@riniya.ts/database/Security/Developer";

import {
    ButtonInteraction,
    CommandInteraction,
    GuildMember,
    Interaction,
    TextChannel
} from "discord.js";

export default class InteractionEvent extends BaseEvent {
    public constructor() {
        super("interactionCreate", async (interaction: Interaction<"cached">) => {
            const developer = await Developer.findOne({ userId: interaction.member.id });

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

                    if (handler.options.get("isDeveloper"))
                        if (developer)
                            return handler.handler(interaction, interaction.member as GuildMember, interaction.guild);
                        else
                            return ((interaction) as CommandInteraction<"cached">).reply({
                                content: 'Only my developers can execute this command.',
                                ephemeral: true
                            });
                    else if (handler.options.get("isNSFW"))
                        if ((interaction.channel as TextChannel).nsfw)
                            return handler.handler(interaction, interaction.member as GuildMember, interaction.guild);
                        else
                            return ((interaction) as CommandInteraction<"cached">).reply({
                                content: 'Sorry, this channel is not NSFW.',
                                ephemeral: true
                            });
                    else if (handler.options.get("isProtected"))
                        if (interaction.member.permissions.has("MODERATE_MEMBERS"))
                            return handler.handler(interaction, interaction.member as GuildMember, interaction.guild);
                        else
                            return ((interaction) as CommandInteraction<"cached">).reply({
                                content: 'Sorry, you need to be Moderator to execute this command',
                                ephemeral: true
                            });
                    else
                        return handler.handler(interaction, interaction.member as GuildMember, interaction.guild);
                } else if (interaction.isButton() || interaction.isSelectMenu()) {
                    const customId: string = interaction.customId;
                    const handler: BaseButton<unknown, unknown> = this.instance.buttonManager.getButton(customId);

                    if (!handler) return;

                    if (handler.setting.get("isDynamic"))
                        if (handler.setting.get("ownerId") === interaction.member.id)
                            return handler.handler(interaction);
                        else
                            return ((interaction) as ButtonInteraction<"cached">).reply({
                                content: 'You are not allowed to click on this button.',
                                ephemeral: true
                            });
                    else if (handler.setting.get("isProtected"))
                        if (developer)
                            return handler.handler(interaction);
                        else
                            return ((interaction) as ButtonInteraction<"cached">).reply({
                                content: 'You are not allowed to click on this button.',
                                ephemeral: true
                            });
                    else
                        return handler.handler(interaction);
                }
            } catch (err) {
                this.instance.logger.error(`InteractionEvent:(${interaction.id}) | ${err}`);
                return ((interaction) as CommandInteraction<"cached">).reply({
                    content: 'Error occurred while executing interaction.',
                    ephemeral: true
                });
            }
        });
    }
}

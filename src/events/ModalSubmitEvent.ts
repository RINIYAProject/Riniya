/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ModalSubmitEvent.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:59 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 07:58:07 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "@riniya.ts/components/BaseEvent";
import BaseModal from "@riniya.ts/components/BaseModal";

import { ModalSubmitInteraction } from "discord-modals";

export default class ModalSubmit extends BaseEvent {
    public constructor() {
        super("modalSubmit", (interaction: ModalSubmitInteraction) => {
            if (interaction.customId === undefined) interaction.reply({
                content: "Modal can't have a empty 'customId'.",
                ephemeral: true
            });

            try {
                const handler: BaseModal = this.instance.modalManager.getModal(interaction.customId);
                if (!handler) return interaction.reply({
                    content: "The modal '" + interaction.customId + "' is not found.",
                    ephemeral: true
                });

                return handler.handler(interaction);
            } catch (err) {
                this.instance.logger.error(`ModalEvent(${interaction.customId}): ${err}`);
                return interaction.reply({
                    content: "A error occurred during the Modal execution.",
                    ephemeral: true
                });
            }
        });
    }
}
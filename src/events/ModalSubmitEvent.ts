/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ModalSubmitEvent.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:59 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 06:23:00 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/BaseEvent";
import { ModalSubmitInteraction } from "discord-modals";

export default class ModalSubmit extends BaseEvent {
    public constructor() {
        super("modalSubmit", (interaction: ModalSubmitInteraction) => {
            if (interaction.customId === undefined) return;
        });
    }
}
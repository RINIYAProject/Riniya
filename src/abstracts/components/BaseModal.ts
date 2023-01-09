/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseModal.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:19 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 01:39:31 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base, { BaseType } from "../Base";
import { ModalSubmitInteraction } from "discord-modals";

export default abstract class BaseModal extends Base {
    public constructor(name: string, description?: string) {
        super(name, description, BaseType.MODAL);
    }

    public abstract handler(interaction: ModalSubmitInteraction): void;
}
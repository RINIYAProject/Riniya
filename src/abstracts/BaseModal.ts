/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseModal.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:19 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 03:56:05 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base, { BaseType } from "./Base";
import { ModalSubmitInteraction } from "discord-modals";

export default abstract class BaseModal extends Base {
    public constructor(name: string, description?: string) {
        super(name, description, BaseType.MODAL);
    }

    public execute(): void {
        throw new Error("Illegal call.")
    }

    public abstract handler(interaction: ModalSubmitInteraction): void;
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseModal.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:19 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 06:25:20 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base, { BaseType } from "./Base";
import { Modal, ModalSubmitInteraction, showModal } from "discord-modals";
import { Interaction } from "discord.js";

export default abstract class BaseModal extends Base {

    private modal: Modal;

    public constructor(name: string, description: string, modal: Modal) {
        super(name, description, BaseType.MODAL);

        this.modal = modal;
        this.modal.customId = this.name;
        this.modal.title = this.description;
    }

    public abstract handler(interaction: ModalSubmitInteraction): void;

    public show(inter: Interaction): Promise<Modal> {
        return showModal(this.modal, {
            client: this.instance,
            interaction: inter
        });
    }
}
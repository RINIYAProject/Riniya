/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ModalHelper.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:43:21 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 03:30:04 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Modal, SelectMenuComponent, TextInputComponent, showModal } from "discord-modals";
import { ButtonInteraction, Interaction } from "discord.js";
import Ghidorah from "../index";

export default class ModalHelper {
    private modal: Modal;

    public constructor(customId: string, title: string) {
        this.modal = new Modal();
        this.modal.setCustomId(customId);
        this.modal.setTitle(title);
    }

    public addTextInput(component: TextInputComponent): ModalHelper {
        this.modal.addComponents(component);
        return this;
    }

    public addSelectMenu(component: SelectMenuComponent): ModalHelper {
        this.modal.addComponents(component);
        return this;
    }

    public generate(inter: Interaction<"cached">): Promise<Modal> {
        return showModal(this.modal, {
            client: Ghidorah.instance,
            interaction: inter
        });
    }

    public toModal(): Modal {
        return this.modal;
    }
}
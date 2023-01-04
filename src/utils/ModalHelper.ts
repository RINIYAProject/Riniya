import { Modal, SelectMenuComponent, TextInputComponent, showModal } from "discord-modals";
import { ButtonInteraction } from "discord.js";
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

    public generate(inter: ButtonInteraction): Promise<Modal> {
        return showModal(this.modal, {
            client: Ghidorah.instance,
            interaction: inter
        });
    }

    public toModal(): Modal {
        return this.modal;
    }
}
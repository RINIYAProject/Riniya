import BaseModal from "@riniya.ts/components/BaseModal";
import OptionMap from "@riniya.ts/utils/OptionMap";
import ModalAnnounce from "./owner/ModalAnnounce";
import ModalVerificationSubmit from "./verify/ModalVerificationSubmit";

export default class ModalManager {
    private MODALS: OptionMap<string, BaseModal>;

    public constructor() {
        this.MODALS = new OptionMap<string, BaseModal>();
    }

    public registerModals(): void {
        this.registerModal(new ModalAnnounce());
        this.registerModal(new ModalVerificationSubmit());
    }

    public registerModal(modal: BaseModal): void {
        if (this.MODALS.get(modal.name)) {
            throw new Error("You can't register the same 'BaseModal' at once");
        }
        this.MODALS.add(modal.name, modal);
    }

    public getModal(customId: string): BaseModal {
        return this.MODALS.get(customId);
    }

    public reload(): void {
        this.MODALS.getMap().clear();
        this.registerModals();
    }
}
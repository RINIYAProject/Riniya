/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ButtonManager.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:24:23 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/04 20:41:08 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import OptionMap from "@riniya.ts/utils/OptionMap";
import Logger from "@riniya.ts/logger";
import BaseButton from "@riniya.ts/components/BaseButton";
import BaseComponent from "@riniya.ts/components/BaseComponent";
import { Snowflake, Collection, MessageButton, Interaction } from "discord.js";
import AcceptRules from "./rules/AcceptRules";
import ButtonVerify from "./verification/ButtonVerify";
import Fragment from "./Fragment";
import ButtonSelectRole from "./roles/ButtonSelectRole";
import SelectUpdate from "./verification/SelectUpdate";
import SelectRoleSubmit from "./roles/SelectRoleSubmit";

export default class ButtonManager {
    private BUTTONS: OptionMap<String, BaseButton<unknown, unknown>>;
    private component: OptionMap<String, BaseComponent<Interaction<"cached">, unknown>>
    private DYNAMIC_BUTTON: OptionMap<Snowflake, OptionMap<String, BaseButton<unknown, unknown>>>;
    private logger: Logger;

    public constructor() {
        this.BUTTONS = new OptionMap<String, BaseButton<unknown, unknown>>();
        this.component = new OptionMap<String, BaseComponent<Interaction<"cached">, unknown>>();
        this.DYNAMIC_BUTTON = new OptionMap<Snowflake, OptionMap<String, BaseButton<unknown, unknown>>>();
        this.logger = new Logger("ButtonRegistry");
    }

    public registerButtons(): void {
        this.addButton(new AcceptRules());
        this.addButton(new ButtonVerify());
        this.addButton(new ButtonSelectRole());
        this.addButton(new SelectUpdate());
        this.addButton(new SelectRoleSubmit());

        //COMPONENTS
    }

    public addButton(button: BaseButton<unknown, unknown>): void {
        button.setting.add("isDynamic", false);
        this.BUTTONS.add(button.customId, button);
        this.logger.info(`Component ${button.customId} registered.`);
    }

    public addComponent(handle: BaseComponent<Interaction<"cached">, unknown>): void {
        this.component.add(handle.name, handle);
    }

    public getComponent(customId: string): BaseComponent<Interaction<"cached">, unknown> {
        return this.component.get(customId);
    }

    public addDynamicButton(userId: Snowflake, button: BaseButton<unknown, unknown>): void {
        button.setting.add("ownerId", userId);
        button.setting.add("timeout", 300);
        button.setting.add("isDynamic", true);

        const fX: OptionMap<String, BaseButton<unknown, unknown>> =
            new OptionMap<String, BaseButton<unknown, unknown>>()
                .add(button.name, button);
        this.DYNAMIC_BUTTON.add(userId, fX);
        this.logger.info(`Dynamic button added for ${userId}@${button.customId} expire at ${new Date((button.setting.get("timeout") as number))}.`);
    }

    public getButton(customId: String): BaseButton<unknown, unknown> {
        const button: BaseButton<unknown, unknown> = this.BUTTONS.get(customId);
        if (button.setting !== undefined && button.setting.get("isRestricted"))
            throw new Error("You can't call " + button.customId + " because it's restricted.");
        return button;
    }

    public getDynamicButton(userId: Snowflake, customId: String): BaseButton<unknown, unknown> {
        return this.DYNAMIC_BUTTON.get(userId).get(customId);
    }

    public createLinkButton(label: string, link: string): MessageButton {
        return new Fragment(label, link).generate();
    }

    public executeOnly(customId: string, inter: Interaction<"cached">): void {
        this.BUTTONS.get(customId).handler(inter);
    }

    public reload() {
        this.BUTTONS.getMap().clear();
        this.logger.warn("Button registry cleared.");
        this.registerButtons();
        this.logger.info("Button regitry reloaded.");
    }

    public toMap(): Collection<String, BaseButton<unknown, unknown>> {
        return this.BUTTONS.getMap()
    }
}
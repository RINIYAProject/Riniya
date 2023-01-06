/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ButtonManager.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:24:23 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 03:19:29 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import OptionMap from "../../utils/OptionMap";
import Logger from "../../utils/Logger";
import BaseButton from "../../abstracts/BaseButton";
import { Snowflake, Collection, MessageButton } from "discord.js";
import AcceptRules from "./rules/AcceptRules";
import ButtonVerify from "./verification/ButtonVerify";
import Fragment from "./Fragment";

export default class ButtonManager {
    private BUTTONS: OptionMap<String, BaseButton<unknown, unknown>>;
    private DYNAMIC_BUTTON: OptionMap<Snowflake, OptionMap<String, BaseButton<unknown, unknown>>>;
    private logger: Logger;

    public constructor() {
        this.BUTTONS = new OptionMap<String, BaseButton<unknown, unknown>>();
        this.DYNAMIC_BUTTON = new OptionMap<Snowflake, OptionMap<String, BaseButton<unknown, unknown>>>();
        this.logger = new Logger("ButtonRegistry");
    }

    public registerButtons(): void {
        this.addButton(new AcceptRules());
        this.addButton(new ButtonVerify());
    }

    public addButton(button: BaseButton<unknown, unknown>): void {
        button.setting.add("isDynamic", false);
        this.BUTTONS.add(button.customId, button);
        this.logger.info(`Component ${button.customId} registered.`);
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
        return this.BUTTONS.get(customId);
    }

    public getDynamicButton(userId: Snowflake, customId: String): BaseButton<unknown, unknown> {
        return this.DYNAMIC_BUTTON.get(userId).get(customId);
    }

    public createLinkButton(label: string, link: string): MessageButton {
        return new Fragment(label, link).generate();
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
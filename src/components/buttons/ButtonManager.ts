/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ButtonManager.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:24:23 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 08:31:43 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import OptionMap from "../../utils/OptionMap";
import Logger from "../../utils/Logger";
import BaseButton from "../../abstracts/BaseButton";
import { Snowflake, Collection } from "discord.js";
import AcceptRules from "./rules/AcceptRules";

export default class ButtonManager {
    private BUTTONS: OptionMap<String, BaseButton>;
    private DYNAMIC_BUTTON: OptionMap<Snowflake, OptionMap<String, BaseButton>>;
    private logger: Logger;

    public constructor() {
        this.BUTTONS = new OptionMap<String, BaseButton>();
        this.DYNAMIC_BUTTON = new OptionMap<Snowflake, OptionMap<String, BaseButton>>();
        this.logger = new Logger("ButtonRegistry");
    }

    public registerButtons(): void { 
        this.addButton(new AcceptRules());
    }

    public addButton(button: BaseButton): void {
        button.setting.add("isDynamic", false);
        this.BUTTONS.add(button.customId, button);
        this.logger.info(`Button ${button.customId} registered.`);
    }

    public addDynamicButton(userId: Snowflake, button: BaseButton): void {
        const date: Number = new Date(10000 * 5).getDate();
        button.setting.add("ownerId", userId);
        button.setting.add("timeout", date);
        button.setting.add("isDynamic", true);

        const fX: OptionMap<String, BaseButton> =
            new OptionMap<String, BaseButton>()
                .add(button.name, button);
        this.DYNAMIC_BUTTON.add(userId, fX);
        this.logger.info(`Dynamic button added for ${userId}@${button.customId} expire at ${new Date((button.setting.get("timeout") as number))}.`);
    }

    public getButton(customId: String): BaseButton {
        return this.BUTTONS.get(customId);
    }

    public getDynamicButton(userId: Snowflake, customId: String): BaseButton {
        return this.DYNAMIC_BUTTON.get(userId).get(customId);
    }

    public toMap(): Collection<String, BaseButton> {
        return this.BUTTONS.getMap()
    }
}
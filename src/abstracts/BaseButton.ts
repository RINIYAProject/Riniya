/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseButton.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:06 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 00:32:46 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base, { BaseType } from "./Base";
import OptionMap from "../utils/OptionMap";
import { ButtonInteraction, MessageButton } from "discord.js";

export default abstract class BaseButton extends Base {

    public customId: string;
    public setting: OptionMap<string, unknown>;

    public constructor(name: string, label: string, buttonSetting: OptionMap<string, unknown>) {
        super(name, label, BaseType.BUTTON);

        this.customId = this.name;
        this.setting = buttonSetting;
    }

    public execute(): void {
        throw new Error("Method not implemented.");
    }

    public abstract handler(interaction: ButtonInteraction): void;
    public abstract generate(): MessageButton;
}
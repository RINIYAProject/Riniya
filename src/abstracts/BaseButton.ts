/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseButton.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:06 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 07:13:55 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base, { BaseType } from "./Base";
import OptionMap from "../utils/OptionMap";
import { ButtonInteraction, MessageEmbed } from "discord.js";

export default abstract class BaseButton<T, V> extends Base {
    public customId: string;
    public setting: OptionMap<string, unknown>;

    public constructor(name: string, label: string, setting: OptionMap<string, unknown>) {
        super(name, label, BaseType.BUTTON);
        this.customId = this.name;
        this.setting = setting;
    }

    public execute(): void {
        throw new Error("Method not implemented.");
    }

    public abstract handler(interaction: ButtonInteraction<"cached">): Promise<V>;
    public abstract message(): MessageEmbed;
    public abstract generate(): T;

    protected getComponent(customId: string): T {
        return this.instance.buttonManager.getButton(customId).generate() as T;
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseButton.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:06 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 01:02:10 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base, { BaseType } from "./Base";
import OptionMap from "../utils/OptionMap";
import { ButtonInteraction, MessageEmbed } from "discord.js";

export default abstract class BaseButton<T, V> extends Base {
    public customId: string;
    public setting: OptionMap<string, unknown>;

    public constructor(name: string, label: string, setting?: OptionMap<string, unknown>) {
        super(name, label, BaseType.BUTTON);
        this.customId = this.name;
        this.setting = setting || new OptionMap<string, unknown>();
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
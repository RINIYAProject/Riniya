/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseButton.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:06 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 19:34:43 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base from "../Base";
import OptionMap from "@riniya.ts/utils/OptionMap";
import { Interaction, MessageEmbed } from "discord.js";

export default abstract class BaseButton<T, V> extends Base {
    public readonly customId: string;
    public readonly setting: OptionMap<string, unknown>;

    protected constructor(name: string, label: string, setting?: OptionMap<string, unknown>) {
        super(name, label, "BUTTON");
        this.customId = this.name;
        this.setting = setting || new OptionMap<string, unknown>();
    }

    public abstract handler(interaction: Interaction<"cached">): Promise<V>;
    public abstract message(): MessageEmbed;
    public abstract generate(): T;

    protected getComponent(customId: string): T {
        return this.instance.buttonManager.getButton(customId).generate() as T;
    }
}

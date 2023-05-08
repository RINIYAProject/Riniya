/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Fragment.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 20:01:21 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:14:09 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseButton from "@riniya.ts/components/BaseButton";
import OptionMap from "@riniya.ts/utils/OptionMap";

import { ButtonInteraction, MessageButton, MessageEmbed } from "discord.js";

export default class FragmentAction extends BaseButton<MessageButton, void> {

    private custom_id: string;

    public constructor(label: string, custom_id: string) {
        super(`row_action_${custom_id}`, label, new OptionMap<string, unknown>());

        this.custom_id = custom_id;
    }

    public handler(interaction: ButtonInteraction<"cached">): Promise<void> { return }

    public generate(): MessageButton {
        return new MessageButton()
            .setLabel(this.description)
            .setStyle("PRIMARY")
            .setCustomId(this.custom_id);
    }

    public message(): MessageEmbed {
        return null;
    }
}
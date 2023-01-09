/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Fragment.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 20:01:21 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 00:57:32 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseButton from "../../abstracts/components/BaseButton";
import { ButtonInteraction, MessageButton, MessageEmbed } from "discord.js";
import OptionMap from "../../utils/OptionMap";

export default class Fragment extends BaseButton<MessageButton, void> {

    private link: string;

    public constructor(label: string, link: string) {
        super("row_temporary", label, new OptionMap<string, unknown>());

        this.link = link;
    }

    public handler(interaction: ButtonInteraction<"cached">): Promise<void> { return }

    public generate(): MessageButton {
        return new MessageButton()
            .setLabel(this.description)
            .setStyle("LINK")
            .setURL(this.link);
    }

    public message(): MessageEmbed {
        return null;
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Fragment.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 20:01:21 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 20:01:48 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseButton from "../../abstracts/BaseButton";
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
            .setCustomId(this.customId)
            .setLabel(this.description)
            .setStyle("LINK")
            .setURL(this.link);
    }

    public message(): MessageEmbed {
        return null;
    }
}
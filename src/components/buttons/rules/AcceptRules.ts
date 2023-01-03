/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AcceptRules.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:24:12 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 09:28:31 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import OptionMap from "../../../utils/OptionMap";
import {
    ButtonInteraction,
    MessageButton
} from "discord.js";
import BaseButton from "../../../abstracts/BaseButton";
import Guild from "../../../database/Models/Guild/Guild";

export default class AcceptRules extends BaseButton {

    public constructor() {
        super(
            "row_agree",
            "Accept",
            new OptionMap<string, unknown>()
        );
    }

    public handler(interaction: ButtonInteraction): void { }

    public generate(): MessageButton {
        return new MessageButton()
            .setCustomId(this.customId)
            .setLabel(this.description)
            .setStyle("SUCCESS")
            .setDisabled(false);
    }
}
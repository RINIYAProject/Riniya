/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MessageEvent.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:57 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 06:22:58 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/BaseEvent";
import { Message } from "discord.js";

export default class MessageEvent extends BaseEvent {
    public constructor() {
        super("messageCreate", (message: Message) => {
            if (message.author.bot) return;
            if (message.author.system) return;
        });
    }
}
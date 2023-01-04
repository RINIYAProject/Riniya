/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MessageEvent.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:57 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 09:18:44 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/BaseEvent";
import { Message } from "discord.js";
import MessageData from "../database/Models/Common/Message";

export default class MessageEvent extends BaseEvent {
    public constructor() {
        super("messageCreate", (message: Message) => {
            if (message.author.bot) return;
            if (message.author.system) return;

            new MessageData({
                guildId: message.guildId,
                memberId: message.author.id,
                content: message.content,
                registeredAt: message.createdTimestamp
            });
        });
    }
}
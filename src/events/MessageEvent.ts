/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MessageEvent.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:57 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:29:41 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/components/BaseEvent";
import { Message } from "discord.js";
import MessageData from "../database/Models/Common/Message";

export default class MessageEvent extends BaseEvent {
    public constructor() {
        super("message", (message: Message) => {
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
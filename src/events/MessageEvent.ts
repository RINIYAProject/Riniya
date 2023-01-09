/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MessageEvent.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:57 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 07:57:48 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "@riniya.ts/components/BaseEvent";
import MessageData from "@riniya.ts/database/Common/Message";

import { Message } from "discord.js";

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
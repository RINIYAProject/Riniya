/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MessageEvent.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:57 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/02 02:55:28 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "@riniya.ts/components/BaseEvent";
import MessageData from "@riniya.ts/database/Common/Message";
import Guild from "@riniya.ts/database/Guild/Guild";

import { Message } from "discord.js";

export default class MessageEvent extends BaseEvent {
    public constructor() {
        super("messageCreate", async (message: Message) => {
            if (message.author.bot) return;
            if (message.author.system) return;

            new MessageData({
                guildId: message.guildId,
                memberId: message.author.id,
                content: message.content || 'No content.',
                registeredAt: message.createdTimestamp
            }).save().then(result => {
                this.instance.serverManager.websocket.sendPacket("RTC_MESSAGE_ACK", {
                    guildId: message.guild.id,
                    memberId: message.author.id,
                    messageId: result._id
                }, "*")
            })

            const guild = await Guild.findOne({ guildId: message.guildId });

            if (guild.level) {
                let randomAmountXp = Math.floor(Math.random() * 100) + 1;
                //  const hasLeveledUp: boolean = this.instance.discordXp.appendXp()
            }
        });
    }
}
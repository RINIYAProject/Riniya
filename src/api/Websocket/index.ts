/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/30 19:38:33 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/09 04:38:30 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from '@riniya.ts';

import Mesa, { Message } from "@cryb/mesa"
import https from "https"
import { MessageEmbed, TextChannel } from 'discord.js';

declare type Data = {
    [key in string]?: any;
};

export default class Websocket extends Mesa {
    public constructor(server: https.Server) {
        super({
            port: 8443,
            server: server,
            heartbeat: {
                enabled: true,
                interval: 10000
            },
            redis: process.env['REDIS_URL']
        });

        this.on('connection', client => {
            client.on('message', message => {
                const { type, data } = message

                switch (type) {
                    case "AUTHENTICATION": {
                        const channel: TextChannel = Riniya.instance.guilds.cache.get("1071173995539484702").channels.cache.get("1072224029873815674") as TextChannel
                        channel.send({
                            embeds: [
                                new MessageEmbed()
                                    .setAuthor("Authentication requested.")
                                    .setColor("RED")
                                    .setDescription(`CLI access ${data['status'] ? 'granted' : 'denied'} for ${data['username']}`)
                                    .setTimestamp(Date.now())
                            ]
                        })
                    }
                        break;
                    default: {
                        this.sendPacket("RESPONSE", {
                            status: false,
                            error: "This key dosn't exist."
                        }, client.id)
                    }
                        break;
                }
            })
        })
    }

    protected sendPacket(action: string, data: Data, recipient: string): void {
        this.send(new Message(0, data, action), [recipient])
    }
}
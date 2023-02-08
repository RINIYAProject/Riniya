/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/30 19:38:33 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/08 07:12:57 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from '@riniya.ts';

import Mesa, { Message } from "@cryb/mesa"
import https from "https"
import Session from '@riniya.ts/database/Security/Session';
import { v4 } from 'uuid';

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

        var interval: NodeJS.Timeout

        this.on('connection', client => {

            client.send(new Message(0, {
                status: 'online'
            }, "STATUS"))

            interval = setInterval(() => {
                client.send(new Message(0, {
                    id: v4(),
                    data: {
                        guilds: Riniya.instance.guilds.cache.size
                    }
                }, "DEBUG"))
            }, 1000)

            client.on('message', message => {
                const { type, data } = message

                client.send(new Message(0, {
                    name: type,
                    data: data
                }, "RESPONSE"))

                Riniya.instance.logger.info(`[Websocket] Receiving message : (type: ${type}, data: ${data})`)
            })
        })

        this.on('disconnection', (code: number, reason: string) => {
            clearInterval(interval)
            Riniya.instance.logger.warn(`[Websocket] A client is now disconnected (code: ${code}, reasons: ${reason})`)
        })
    }
}
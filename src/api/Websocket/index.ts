/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/30 19:38:33 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/08 05:21:03 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from '@riniya.ts';

import Mesa, { Message } from "@cryb/mesa"
import https from "https"
import Session from '@riniya.ts/database/Security/Session';

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

                Riniya.instance.logger.info(`[Websocket] Receiving message : (type: ${type}, data: ${data})`)
            })
        })

        this.on('disconnection', (code: number, reason: string) => {
            Riniya.instance.logger.warn(`[Websocket] A client is now disconnected (code: ${code}, reasons: ${reason})`)
        })
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/30 19:38:33 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/15 07:38:44 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from '@riniya.ts';

import Mesa, { Message } from "@cryb/mesa"
import https from "https"
import { MessageEmbed, TextChannel, User as DUser } from 'discord.js';
import Session from '@riniya.ts/database/Security/Session';
import User from '@riniya.ts/database/Security/User';

declare type Data = {
    [key in string]?: any;
};

declare type Payload = {
    payload: string;
    data: any
}

export default class Websocket extends Mesa {
    public constructor(server: https.Server) {
        super({
            port: 8443,
            server: server,
            heartbeat: {
                enabled: true,
                interval: 10000
            },
            redis: process.env['REDIS_URL'],
            authentication: {
                required: true,
                storeConnectedUsers: true,
                timeout: 10000
            }
        });
    }

    public sendPacket(action: string, data: Data, recipient: string): void {
        this.send(new Message(0, data, action), [recipient])
    }
}
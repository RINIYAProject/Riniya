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

import Mesa, { Message } from "@cryb/mesa"
import http from "http"

declare type Data = {
    [key in string]?: any;
};

export default class Websocket extends Mesa {
    public constructor(server: http.Server) {
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
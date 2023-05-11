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
import Session from "@riniya.ts/database/Security/Session";
import User from "@riniya.ts/database/Security/User";
import { isNull } from "@riniya.ts/types";
import http from "http"

declare type Data = {
    [key in string]?: any;
};

declare type AuthenticationUser = {
    identifier: String;
    accessToken: String;
    clientToken: String;
}

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

        this.on("connection", client => {
            client.authenticate(async (data: AuthenticationUser, done) => {
                if (isNull(data.identifier) 
                    || isNull(data.accessToken)
                    || isNull(data.clientToken)) {
                        return client.disconnect(9005)
                }

                try {
                    const session = await Session.findOne({
                        userId: data.identifier,
                        accessToken: data.accessToken,
                        clientToken: data.clientToken
                    })

                    if (isNull(session.userId) 
                        || isNull(session.accessToken)
                        || isNull(session.clientToken)) {
                            return client.disconnect(9005)
                    }

                    const user = await User.findOne({
                        userId: data.identifier
                    })

                    if (isNull(user._id) 
                        || isNull(user.discordId)) {
                            return client.disconnect(10305)
                    }

                    done(null, { id: session.userId, user: {
                        session: session,
                        user: user
                    }})
                } catch(error) {
                    done(error)
                }
            })
        })
    }

    public sendPacket(action: string, data: Data, recipient: string): void {
        this.send(new Message(0, data, action), [recipient])
    }
}
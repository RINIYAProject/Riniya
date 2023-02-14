/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/30 19:38:33 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/14 10:27:39 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from '@riniya.ts';

import Mesa, { Message } from "@cryb/mesa"
import https from "https"
import { MessageEmbed, TextChannel, User } from 'discord.js';
import Session from '@riniya.ts/database/Security/Session';

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

        this.on('connection', client => {
            client.authenticate(async (data, done) => {
                try {
                    const user = await Session.findOne({
                        accessToken: data.accessToken,
                        clientToken: data.clientToken
                    })

                    done(null, { id: user._id, user: user })
                } catch (error) {
                    done(error)
                }
            })

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
                    case "PAYLOAD": {
                        const packet = message.data as Payload
                        this.handle(client.id, packet.payload, packet.data);
                    }
                        break
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

    private handle(clientId: string, payload: string, data: any) {
        switch (payload) {
            case "discord_account_link": {
                let user: User = Riniya.instance.users.cache.get(data['discordId'] || "no_id");
                try {
                    user.send({
                        embeds: [
                            new MessageEmbed()
                                .setAuthor("RINIYA CLI - ACCOUNT ACCESS")
                                .setTitle("Authorisation requested for RiniyaCLI.")
                                .setDescription("Do you allow RiniyaCLI to have access to your servers data?")
                                .addField("ClientID", "" + clientId)
                                .setColor("RED")
                        ],
                        components: [
                            {
                                type: 1,
                                components: [
                                    Riniya.instance.buttonManager.createLinkButton("Authorize", "https://api.ghidorah.uk/api/security/cli/authorize/" + data['discordId'] + "/" + data['accessToken']),
                                    Riniya.instance.buttonManager.createLinkButton("Cancel", "https://api.ghidorah.uk/api/security/cli/cancel/" + data['discordId'] + "/" + data['accessToken'])
                                ]
                            }
                        ]
                    })
                } catch (err) {
                    Riniya.instance.logger.error(err)
                }
            }
                break;
            default: {
                this.sendPacket("PAYLOAD_RESPONSE", {
                    status: false,
                    error: "Payload key is invalid."
                }, clientId)
            }
        }
    }
}
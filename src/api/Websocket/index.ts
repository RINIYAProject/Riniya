/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/30 19:38:33 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/02 05:59:35 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from '@riniya.ts';
import OptionMap from '@riniya.ts/utils/OptionMap';
import BaseWSEvent from '@riniya.ts/server/BaseWSEvent';

import https from 'https'
import { Server } from "socket.io";

import ConnectionEvent from './events/ConnectionEvent';
import DisconnectEvent from './events/DisconnectEvent';
import DisconnectingEvent from './events/DisconnectingEvent';

export declare type EventId = String | string;

export default class Websocket {
    public readonly io: Server
    public readonly events: OptionMap<EventId, BaseWSEvent>

    public constructor(server: https.Server) {
        this.io = new Server(server, {})
        this.events = new OptionMap<EventId, BaseWSEvent>()
    }

    public init(): void {
        this.registerEvent(new ConnectionEvent())
        this.registerEvent(new DisconnectEvent())
        this.registerEvent(new DisconnectingEvent())
    }

    private registerEvent(event: BaseWSEvent): void {
        this.events.add(event.name, event)
    }

    public shutdown(): void {
        if (this.io !== undefined)
            this.io.close((err) => Riniya.instance.logger.error(err.message))
    }
}
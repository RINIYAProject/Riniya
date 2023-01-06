/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Handshake.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/06 07:27:56 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/06 07:42:08 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Payload, { PayloadRequest } from "../../Payload";
import WebSocket from "ws";
import Ghidorah from "index";

export default class Handshake extends Payload {

    public constructor() {
        super("login@handshake")
    }

    public handle(ws: WebSocket.WebSocket, data: PayloadRequest): void {
        Ghidorah.instance.logger.info(`Handshake websocket executed! ${data.key}`);
    }
}
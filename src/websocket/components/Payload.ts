/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Payload.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/06 05:58:17 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/06 07:42:02 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { PayloadData } from "../index";
import WebSocket from "ws";

export declare type PayloadRequest = PayloadData;

export default abstract class Payload {
    public key: string
    public protected: boolean

    public constructor(key: string, isProtected?: boolean) {
        this.key = key
        this.protected = isProtected || false
    }

    public abstract handle(socket: WebSocket.WebSocket, data: PayloadRequest): void
}
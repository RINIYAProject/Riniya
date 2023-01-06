/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PayloadManager.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/06 07:28:04 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/06 07:28:32 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import OptionMap from "../utils/OptionMap";
import Middleware from "./components/Middleware";
import Payload from "./components/Payload";
import Handshake from "./components/payload/login/Handshake";

export default class PayloadManager {
    private payloads: OptionMap<string, Payload>
    private middleware: OptionMap<string, Middleware>

    public constructor() {
        this.payloads = new OptionMap<string, Payload>();
        this.middleware = new OptionMap<string, Middleware>();
    }

    public registerMiddlewares(): void {

    }

    public registerMiddleware(handle: Middleware): void {
        if (this.middleware.get(handle.name)) {
            throw new Error("You can't register the same middleware at one");
        }
        this.middleware.add(handle.name, handle);
    }

    public getMiddleware(customId: string): Middleware {
        return this.middleware.get(customId);
    }

    public registerPayloads(): void {
        this.registerPayload(new Handshake());
    }

    public registerPayload(handle: Payload): void {
        if (this.payloads.get(handle.key)) {
            throw new Error("You can't register the same payload at one");
        }
        this.payloads.add(handle.key, handle);
    }

    public payload(customId: string): Payload {
        return this.payloads.get(customId);
    }


}
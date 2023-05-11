/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ReadyEvent.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:23:03 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/02 02:53:56 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "@riniya.ts/components/BaseEvent";
import Tuple from "@riniya.ts/utils/Tuple";
import moment from "moment";
import { v4 } from "uuid";

export default class Ready extends BaseEvent {

    private activities: Tuple<string> = new Tuple<string>()

    public constructor() {
        super("ready", () => {
            this.instance.user.setActivity(`Initializing...`, { type: "LISTENING" });
            this.instance.user.setStatus("idle");

            this.activities.add(`Lurk at ${this.instance.users.cache.size} cuties UwU`)
            this.activities.add(`Handling ${this.instance.guilds.cache.size} servers :D`)
            this.activities.add(`RINIYA Is still in developement.`)
            this.activities.add(`Thank you for supporting us :D`)
            this.activities.add(`/help for more informations`)

            setInterval(() => {
                this.instance.user.setActivity({
                    type: "WATCHING",
                    name: this.activities.random()
                })
            }, 15 * 1000)

            this.instance.loaded = true;
            this.instance.user.setStatus("online");
            this.instance.logger.info('The system is ready.');

            this.instance.serverManager.websocket.sendPacket("RTC_CLIENT_STATE", {
                id: v4(),
                state: 'ready'
            }, "*")
        });
    }
}
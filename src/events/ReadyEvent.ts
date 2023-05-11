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
import { ExcludeEnum } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";
import moment from "moment";
import { v4 } from "uuid";

export declare type Activity = {
    message: string;
    type: ExcludeEnum<typeof ActivityTypes, 'CUSTOM'>;
}

export default class Ready extends BaseEvent {

    private activities: Tuple<Activity> = new Tuple<Activity>()

    public constructor() {
        super("ready", () => {
            this.instance.user.setActivity(`Initializing...`, { type: "LISTENING" });
            this.instance.user.setStatus("idle");

            this.initActivity()
            this.addActivites()

            setInterval(() => {
                if (this.activities.getAll().size < 1)
                    return this.instance.logger.error("[ActivityManager] : Cannot load the activities lists.")
                let activity = this.activities.random();
                this.instance.user.setActivity({
                    type: activity.type,
                    name: activity.message
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

    private initActivity() {
        this.instance.logger.info("[ActivityManager] Loading activities...")

        setInterval(() => {
            this.activities.clear()
            this.addActivites()

            this.instance.logger.info("[ActivityManager] Data updated at " + moment(Date.now()) + ".")
        }, 30 * 1000)
    }

    private addActivites() {
        this.activities.add({
            message: `Lurk at ${this.instance.users.cache.size} cuties UwU`,
            type: "WATCHING"
        })
        this.activities.add({
            message: `Handling ${this.instance.guilds.cache.size} servers :D`,
            type: "LISTENING"
        })
        this.activities.add({
            message: `RINIYA Is still in developement.`,
            type: "LISTENING"
        })
        this.activities.add({
            message: `Thank you for supporting us :D`,
            type: "LISTENING"
        })
        this.activities.add({
            message: `/help for more informations`,
            type: "LISTENING"
        })
    }
}
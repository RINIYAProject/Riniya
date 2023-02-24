/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ErrorEvent.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:34 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 07:51:59 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "@riniya.ts/components/BaseEvent";

export default class ErrorEvent extends BaseEvent {
    public constructor() {
        super("error", () => {
            this.instance.serverManager.websocket.sendPacket("RTC_ERROR", {
                time: Date.now()
            }, "*")
            this.instance.logger.error(`Unknown error occurred.`);
        });
    }
}
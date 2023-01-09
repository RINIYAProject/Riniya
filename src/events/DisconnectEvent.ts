/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   DisconnectEvent.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:31 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 07:51:51 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "@riniya.ts/components/BaseEvent";

export default class DisconnectEvent extends BaseEvent {
    public constructor() {
        super("disconnect", () => {
            this.instance.logger.error(`RTC suddenly disconnected.`);
        });
    }
}
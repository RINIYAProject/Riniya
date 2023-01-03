/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   DisconnectEvent.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:31 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 06:22:32 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/BaseEvent";

export default class DisconnectEvent extends BaseEvent {
    public constructor() {
        super("disconnect", () => {
            this.instance.logger.error(`RTC suddenly disconnected.`);
        });
    }
}
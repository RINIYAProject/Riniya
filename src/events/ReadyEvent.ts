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

export default class Ready extends BaseEvent {
    public constructor() {
        super("ready", () => {
            this.instance.user.setStatus("online");
            this.instance.user.setActivity(`Lurk`, { type: "WATCHING" });

            this.instance.loaded = true;

            this.instance.logger.info('The system is ready.');
        });
    }
}
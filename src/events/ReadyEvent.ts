/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ReadyEvent.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:23:03 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:22:52 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from "@riniya.ts";
import BaseEvent from "@riniya.ts/components/BaseEvent";

export default class Ready extends BaseEvent {
    public constructor() {
        super("ready", () => {
            const client: Riniya = this.instance;

            client.user.setStatus("online");
            client.user.setActivity(`Lurk`, { type: "WATCHING" });
            client.user.system = true;
            client.user.verified = true;

            client.loaded = true;

            client.logger.info('The system is ready.');
        });
    }
}
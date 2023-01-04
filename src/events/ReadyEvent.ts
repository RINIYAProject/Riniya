/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ReadyEvent.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:23:03 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 09:40:10 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Ghidorah from "../index";
import BaseEvent from "../abstracts/BaseEvent";

export default class Ready extends BaseEvent {
    public constructor() {
        super("ready", () => {
            const client: Ghidorah = this.instance;

            client.user.setStatus("online");
            client.user.setActivity(`Lurk`, { type: "WATCHING" });
            client.user.system = true;
            client.user.verified = true;

            client.loaded = true;

            client.logger.info('The system is ready.');
        });
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ReadyEvent.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:23:03 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 06:23:04 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Ghidorah from "../index";
import BaseEvent from "../abstracts/BaseEvent";

export default class Ready extends BaseEvent {
    public constructor() {
        super("ready", () => {
            const client: Ghidorah = this.instance;

            client.user.setStatus("online");
            client.user.setActivity(`Lurking at cutie fluffies`, { type: "COMPETING" });
            client.user.system = true;
            client.user.verified = true;

            client.loaded = true;

            client.logger.info('The system is ready.');
        });
    }
}
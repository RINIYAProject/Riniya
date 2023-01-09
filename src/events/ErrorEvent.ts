/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ErrorEvent.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:34 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:29:14 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/components/BaseEvent";

export default class ErrorEvent extends BaseEvent {
    public constructor() {
        super("error", () => {
            this.instance.logger.error(`Unknown error occurred.`);
        });
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ErrorEvent.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:34 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 06:22:35 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/BaseEvent";

export default class ErrorEvent extends BaseEvent {
    public constructor() {
        super("error", () => {
            this.instance.logger.error(`Unknown error occurred.`);
        });
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseEvent.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:16 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 01:39:21 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base, { BaseType } from "../Base";

export default abstract class BaseEvent extends Base {
    public constructor(name: string, listener: Function) {
        super(name, "", BaseType.EVENT);

        this.instance.on(this.name, listener.bind(this.instance));
    }
}
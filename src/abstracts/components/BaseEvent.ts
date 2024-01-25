/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseEvent.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:16 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:28:05 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base from "../Base";

export default abstract class BaseEvent extends Base {
    protected constructor(name: string, listener: Function) {
        super(name, "", "EVENT");

        this.instance.on(this.name, listener.bind(this.instance));
    }
}

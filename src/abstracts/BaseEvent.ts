/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseEvent.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:16 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 06:25:17 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base, { BaseType } from "./Base";

export default abstract class BaseEvent extends Base {
    public constructor(name: string, listener: Function) {
        super(name, "", BaseType.EVENT);

        this.instance.on(this.name, listener.bind(this.instance));
    }

    public execute(): void { }
}
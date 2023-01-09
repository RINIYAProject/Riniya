/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseComponent.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/06 09:02:28 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/09 08:27:54 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Interaction } from "discord.js";
import Base from "../Base";

export default abstract class BaseComponent<T extends Interaction<"cached">, V> extends Base {

    public constructor(customId: string) {
        super(customId, "", "COMPONENT");
    }

    public abstract handler(inter: T): V;
}
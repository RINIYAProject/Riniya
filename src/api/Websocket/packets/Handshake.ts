/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Handshake.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/30 19:38:38 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/30 19:38:39 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Packet from "../Packet";

export default class Handshake extends Packet<"CLIENT"> {

    public constructor() {
        super("Handshake", 0x0)
    }

    public handle(data: String): void { }
}
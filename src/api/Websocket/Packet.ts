/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Packet.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/30 19:38:29 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/01 15:45:40 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export declare type Side = 'SERVER' | 'CLIENT'

export default abstract class Packet<T = Side> {
    public readonly name: string
    public readonly side: Side
    public readonly packetId: number

    public constructor(name: string, packetId: number) {
        this.name = name;

        if (packetId >= 0xFFFF) // 65535
            throw new Error("Packet ID can't exceed '0xFFFF'.")
        this.packetId = packetId
    }

    public abstract handle(data: String): void
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PacketBuff.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/02/02 03:16:18 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/02 03:16:22 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import OptionMap from "./OptionMap";
import Tuple from "./Tuple";

export declare type PacketString = String | string;
export declare type PacketNumber = Number | number;
export declare type PacketBoolean = Boolean | boolean;
export declare type PacketObject = Object | object;

export declare type PacketArray =
    Tuple<String>
    | Tuple<Number>
    | Tuple<Boolean>
    | Tuple<any>;

export default class PacketBuff {
    private readonly data: OptionMap<PacketString, any>

    public constructor() {
        this.data = new OptionMap<PacketString, any>()
    }

    public readNumber(key: PacketString): PacketNumber {
        return this.data.get(key)
    }

    public readString(key: PacketString): PacketString {
        return this.data.get(key)
    }

    public readBoolean(key: PacketString): PacketBoolean {
        return this.data.get(key)
    }

    public readObject(key: PacketString): PacketObject {
        return this.data.get(key)
    }

    public readArray(key: PacketString): PacketArray {
        return this.data.get(key)
    }

    // WRITE

    public writeNumber(key: PacketString, value: PacketNumber): void {
        this.data.add(key, value)
    }

    public writeString(key: PacketString, value: PacketString): void {
        this.data.add(key, value)
    }

    public writeBoolean(key: PacketString, value: PacketBoolean): void {
        this.data.add(key, value)
    }

    public writeObject(key: PacketString, value: PacketObject): void {
        this.data.add(key, value)
    }

    public writeArray(key: PacketString, value: PacketArray): void {
        this.data.add(key, value)
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Tuple.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 02:09:16 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/07 00:58:57 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from "@riniya.ts";
import { Collection } from "discord.js";
import OptionMap from "./OptionMap";

/**
 * @description Tuple type like.
 * @author NebraskyTheWolf ( alle.roy )
 */

export default class Tuple<T> {
    private readonly data: OptionMap<number, T>;
    private index: number = 0

    public constructor() {
        this.data = new OptionMap<number, T>();
    }

    public add(type: T): void {
        this.data.add(this.index++, type);
    }

    public random(): T {
        return this.data.get(Math.floor(Math.random() * this.getAll().size))
    }

    public clear(): void {
        this.data.getMap().clear();
    }

    public getAll(): Collection<number, T> {
        return this.data.getMap();
    }
}
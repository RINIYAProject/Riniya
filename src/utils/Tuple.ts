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

import { Collection } from "discord.js";
import { v4 } from "uuid";
import OptionMap from "./OptionMap";

/**
 * @description Tuple type like.
 * @author NebraskyTheWolf ( alle.roy )
 */

export default class Tuple<T> {
    private readonly data: OptionMap<string, T>;

    public constructor() {
        this.data = new OptionMap<string, T>();
    }

    public add(type: T): void {
        this.data.add(v4(), type);
    }

    public clear(): void {
        this.data.getMap().clear();
    }

    public getAll(): Collection<string, T> {
        return this.data.getMap();
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   OptionMap.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:23:15 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 23:21:18 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Collection } from "discord.js";

/**
 * @name OptionMap
 * @description Fast map system
 * @author NebraskyTheWolf
 */

export default class OptionMap<T, V> {
    private map: Collection<T, V>;

    public constructor() {
        this.map = new Collection();
    }

    public add(key: T, value: V): OptionMap<T, V> {
        this.map.set(key, value);
        return this;
    }

    public get(key: T): V {
        return this.map.get(key);
    }

    public remove(key: T): Boolean {
        return this.map.delete(key);
    }

    public size(): Number {
        return this.map.size;
    }

    public getMap(): Collection<T, V> {
        return this.map;
    }
}
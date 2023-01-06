/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Middleware.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/06 06:06:23 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/06 06:18:24 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import OptionMap from "../../utils/OptionMap";

export declare type OptionData = string | boolean | number | Object;
export declare type Request = string | Buffer | ArrayBuffer | Buffer[];

export default abstract class Middleware {
    public name: string
    public options: OptionMap<string, OptionData>

    public constructor(name: string, options?: OptionMap<string, OptionData>) {
        this.name = name;
        this.options = options || new OptionMap<string, OptionData>();
    }

    public abstract request(request: Request): void;
}
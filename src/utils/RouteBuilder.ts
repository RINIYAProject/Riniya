/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RouteBuilder.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 01:06:57 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/09 07:51:16 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export declare type APICors = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export default class RouteBuilder {
    private readonly route: string;
    private readonly protected: boolean;
    private readonly method: APICors;

    public constructor(route: string, isProtected: boolean, method?: APICors) {
        this.route = route;
        this.protected = isProtected;
        this.method = method || "GET";
    }

    public getMethod(): APICors {
        return this.method;
    }

    public getRoute(): string {
        return this.route;
    }

    public isProtected(): boolean {
        return this.protected;
    }
}
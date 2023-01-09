/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseServer.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 01:53:49 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/09 07:48:10 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Tuple from "@riniya.ts/utils/Tuple";
import ServerBuilder from "@riniya.ts/utils/ServerBuilder";
import BaseController from "@riniya.ts/server/BaseController";

export default abstract class BaseServer {
    private readonly server: ServerBuilder
    private readonly routes: Tuple<BaseController>

    public constructor(server: ServerBuilder) {
        this.server = server
        this.routes = new Tuple<BaseController>
    }

    public abstract handler(): void;

    protected registerRoute(route: BaseController): void {
        this.getRoutes().add(route);
    }

    public getServer(): ServerBuilder {
        return this.server
    }

    public getRoutes(): Tuple<BaseController> {
        return this.routes
    }
}
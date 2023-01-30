/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseServer.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 01:53:49 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/30 00:01:42 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import ServerBuilder from "@riniya.ts/utils/ServerBuilder";

export default abstract class BaseServer {
    private readonly server: ServerBuilder

    public constructor(server: ServerBuilder) {
        this.server = server
    }

    public abstract handler(): void;

    public getServer(): ServerBuilder {
        return this.server
    }
}
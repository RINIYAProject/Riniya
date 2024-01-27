/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AbstractRoutes.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 15:35:24 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/11 04:19:41 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Router, Response, Express } from "express";

export default abstract class AbstractWebRoutes {
    public constructor(app: Express) {
        this.register(app); // SELF REGISTERING.
    }

    public abstract register(app: Express): void
}

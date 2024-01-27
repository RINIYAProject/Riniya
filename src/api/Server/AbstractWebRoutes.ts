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

import Base from "../../abstracts/Base";
import { Router, Response } from "express";
import express from "express";

import CacheManager from "../../cache/CacheManager";
import Authentication from "./middlewares/Authentication";

export default abstract class AbstractWebRoutes extends Base {
    protected router: Router
    public isProtected: boolean;
    public prefix: string

    public constructor() {
        super("routes", "", "SERVER")
        this.router = router;

        this.register(); // SELF REGISTERING.
    }

    public abstract register(): void
    public routing(): Router {
        return router;
    }
}

export var router = express.Router()

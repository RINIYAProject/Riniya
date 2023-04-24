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

export declare enum ErrorType {
    SUCCESS_CALLBACK = 200,
    MISSING_ARGUMENTS = 400,
    MISSING_SIGNATURE = 401,
    INSUFICIENT_PERMISSION = 402,
    FORBIDDEN = 403,
    RATELIMITED = 429
}

export default abstract class AbstractRoutes extends Base {
    protected router: Router
    protected readonly cache: CacheManager
    protected auth: Authentication

    public constructor() {
        super("routes", "", "SERVER")
        this.router = router;
        this.cache = new CacheManager("api")
        this.auth = new Authentication()


        this.register(); // SELF REGISTERING.
    }

    public abstract register(): void

    protected error(res: Response, type: ErrorType): void {
        res.status(type.valueOf()).json({
            status: false,
            error: type.toString()
        }).end()
    }

    public routing(): Router {
        return router;
    }
}

export const router = express.Router()
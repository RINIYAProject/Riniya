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

import Minio from "minio"
import CacheManager from "../../cache/CacheManager";

export declare enum ErrorType {
    SUCCESS_CALLBACK = 200,
    MISSING_ARGUMENTS = 400,
    MISSING_SIGNATURE = 401,
    INSUFICIENT_PERMISSION = 402,
    FORBIDDEN = 403,
    RATELIMITED = 429
}

export default abstract class AbstractRoutes extends Base {
    public protected: boolean
    protected router: Router

    protected readonly minioCLI: Minio.Client = this.instance.minioClient
    protected readonly cache: CacheManager

    public constructor(isProtected: boolean) {
        super("routes", "", "SERVER")
        this.protected = isProtected
        this.router = router;
        this.cache = new CacheManager("api")

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
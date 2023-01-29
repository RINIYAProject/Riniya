/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AbstractRoutes.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 15:35:24 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/29 23:44:57 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base from "../abstracts/Base";
import { Router, Response } from "express";

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
    public protected: boolean

    public constructor(isProtected: boolean) {
        super("routes", "", "SERVER")
        this.router = Router()
        this.protected = isProtected
    }

    public abstract register(): Router

    protected error(res: Response, type: ErrorType): void {
        res.status(type.valueOf()).json({
            status: false,
            error: type.toString()
        }).end()
    }
}

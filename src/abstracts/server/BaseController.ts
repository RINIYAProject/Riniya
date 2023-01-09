/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseController.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 01:06:54 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/09 07:43:15 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from "express";
import RouteBuilder from "@riniya.ts/utils/RouteBuilder";

export declare type APIError = 'NOT_FOUND' | 'MISSING_ARGS' | 'SERVER_ERROR' | 'RATE_LIMITED' | 'MISSING_ID' | 'PERMISSION_DENIED';

export default abstract class BaseController {

    private readonly route: RouteBuilder;

    public constructor(route: RouteBuilder) {
        this.route = route;
    }

    public abstract handler(request: Request, response: Response): void;

    protected validation(request: Request, key: string): boolean {
        if (request.params[key] === undefined)
            return true;
        return false;
    }

    protected fetchError(key: APIError): Object {
        return {
            status: false,
            message: key
        }
    }

    public getRoute(): RouteBuilder {
        return this.route;
    }
}
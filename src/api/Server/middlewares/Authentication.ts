/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Authentication.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 15:35:09 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/02 06:34:22 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import AuthHelper, { ICallback } from "@riniya.ts/utils/AuthHelper";
import BaseMiddleware from "../BaseMiddleware";
import { Request, Response } from "express";

export default class Authentication extends BaseMiddleware {

    private handler: AuthHelper

    public constructor() {
        super("Authentication", "Auth Client for the API.")
        this.handler = new AuthHelper()
    }

    public handle(request: Request, response: Response, next): void {
        const scope: string = request.get('X-API-SCOPE') || 'invalid_scope'

        switch (scope) {
            case 'login': {
                const username: string = request.get('X-API-USERNAME') || ""
                const password: string = request.get('X-API-PASSWORD') || ""

                this.handler.login(
                    username, password,
                    (cb: ICallback) => {
                        response.status(200).json({
                            status: cb.status,
                            data: {
                                session: cb.session
                            },
                            error: cb.error
                        }).end();
                    }
                )
            }
                break
            case 'identify': {
                const accessToken: string = request.get('X-API-TOKEN') || ""
                const clientToken: string = request.get('X-API-CLIENT') || ""

                this.handler.identify(
                    accessToken, clientToken,
                    (cb: ICallback) => {
                        response.status(200).json({
                            status: cb.status,
                            data: {
                                session: cb.session
                            },
                            error: cb.error
                        }).end()
                    }
                )

                next()
            }
                break
            default:
                response.status(403).json({
                    status: false,
                    error: 'MISSING_SCOPE',
                    message: 'Available scope is login or identify. Please read the documentations.'
                }).end()
                break
        }
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Authentication.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 15:35:09 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/02 07:40:17 by alle.roy         ###   ########.fr       */
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

    public handle(request: Request, response: Response, next: Function): void {
        const scope: string = request.get('X-API-SCOPE') || 'identify'

        switch (scope) {
            case 'login': {
                const username: string = request.get('X-API-USERNAME') || ""
                const password: string = request.get('X-API-PASSWORD') || ""

                this.handler.login(
                    username, password,
                    (cb: ICallback) => {
                        if (cb.status) {
                            response.setHeader('accessToken', cb.session.accessToken)
                            response.setHeader('clientToken', cb.session.clientToken)
                        }
                        response.status((cb.error ? 403 : 200)).json({
                            status: cb.status,
                            data: cb.session,
                            error: cb.error
                        }).end();
                    }
                )
            }
                break
            case 'identify': {
                const accessToken: string = request.get('accessToken')
                const clientToken: string = request.get('clientToken')

                this.handler.identify(
                    accessToken, clientToken,
                    (cb: ICallback) => {
                        if (cb.status) {
                            next()
                        } else {
                            response.status(403).json({
                                status: cb.status,
                                data: {
                                    session: cb.session || {}
                                },
                                error: cb.error
                            }).end()
                        }
                    }
                )
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
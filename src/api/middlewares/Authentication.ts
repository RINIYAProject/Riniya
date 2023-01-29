/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Authentication.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 15:35:09 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/29 15:35:10 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import AuthHelper, { ICallback } from "@riniya.ts/utils/AuthHelper";
import { ErrorType } from "../AbstractRoutes";
import { Request, Response } from "express";

export default class Authentication {

    private handler: AuthHelper

    public constructor() {
        this.handler = new AuthHelper()
    }

    public handle(request: Request, response: Response, next): void {
        const scope: string = request.header['X-API-SCOPE'] || 'invalid_scope'

        switch (scope) {
            case 'login': {
                const username: string = request.header['X-API-USERNAME'] || ""
                const password: string = request.header['X-API-PASSWORD'] || ""

                this.handler.login(
                    username, password,
                    (cb: ICallback) => {
                        response.status(ErrorType.SUCCESS_CALLBACK).json({
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
                const accessToken: string = request.header['X-API-TOKEN'] || ""
                const clientToken: string = request.header['X-API-CLIENT'] || ""

                this.handler.identify(
                    accessToken, clientToken,
                    (cb: ICallback) => {
                        response.status(ErrorType.SUCCESS_CALLBACK).json({
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
                response.status(ErrorType.MISSING_ARGUMENTS).json({
                    status: false,
                    error: 'MISSING_SCOPE',
                    message: 'Available scope is login or identify. Please read the documentations.'
                }).end()
                break
        }
    }
}
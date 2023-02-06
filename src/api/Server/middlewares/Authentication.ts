import BaseMiddleware from "../BaseMiddleware";
import AuthHelper, { ICallback } from "@riniya.ts/utils/AuthHelper";
import { Request, Response } from "express";

export default class Authentication extends BaseMiddleware {
    private handler: AuthHelper

    public constructor() {
        super("Authentication", "Authentication middleware.")
        this.handler = new AuthHelper()
    }

    public handle(request: Request, response: Response, next): void {
        const scope: string = request.get('X-API-SCOPE') || 'default'

        if (request.originalUrl.length < 3) {
            next()
        } else {
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
                                    error: cb.error
                                })
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
}
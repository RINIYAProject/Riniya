import BaseMiddleware from "../BaseMiddleware";
import AuthHelper, { ICallback } from "@riniya.ts/utils/AuthHelper";
import { Request, Response } from "express";
import { isNull } from "@riniya.ts/types";

export default class Authentication extends BaseMiddleware {
    private handler: AuthHelper

    public constructor() {
        super("Authentication", "Authentication middleware.")
        this.handler = new AuthHelper()
    }

    public handle(request: Request, response: Response, next) {
        const accessToken: string = request.get('accessToken')
        const clientToken: string = request.get('clientToken')

        this.handler.identify(
            accessToken, clientToken,
            async (cb: ICallback) => {
                if (cb.status) {
                    if (!isNull(cb.session.userId)) {
                        if (cb.session.expired) {
                            response.status(403).json({
                                status: false,
                                error: "Session expired, Please relogin before continuing."
                            }).end()
                        } else {
                            next()
                        }
                    } else {
                        response.status(403).json({
                            status: false,
                            error: "No user found for this session."
                        }).end()
                    }
                } else {
                    response.status(403).json({
                        status: cb.status,
                        error: cb.error
                    }).end()
                }
            }
        )
    }
}
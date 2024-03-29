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

    public async handle(request: Request, response: Response, next) {
        const accessToken: string = request.get('accessToken')
        const clientToken: string = request.get('clientToken')

        if (isNull(accessToken) || isNull(clientToken)) {
            response.status(403).json({
                status: false,
                error: "ACCESS_DENIED",
                message: "Authentication required."
            }).end()
        }

        await this.handler.identify(
          accessToken, clientToken,
          async (cb: ICallback) => {
            if (cb.status) {
              if (!isNull(cb.session.userId)) {
                if (cb.session.expired) {
                  response.status(403).json({
                    status: false,
                    error: "Session expired, Please re-login before continuing."
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

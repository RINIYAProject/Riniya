import BaseMiddleware from "../../Server/BaseMiddleware";
import AuthHelper, { ICallback } from "@riniya.ts/utils/AuthHelper";
import { Request, Response } from "express";
import { isNull } from "@riniya.ts/types";

export default class CAuthMiddleware extends BaseMiddleware {
    private handler: AuthHelper

    public constructor() {
        super("ClientAuthenticatin", "Authentication middleware for the website")
        this.handler = new AuthHelper()
    }

    public async handle(request: Request, response: Response, next) {
        if (isNull(request.sessionID)) {
            return response.redirect("https://www.riniya.uk/user/login")
        } else {
            // TODO: Cookie validity checks
            next()
        }
    }
}

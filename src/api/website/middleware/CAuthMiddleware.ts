import BaseMiddleware from "../../Server/BaseMiddleware";
import { Response } from "express";
import { isNull } from "@riniya.ts/types";
import { CustomRequest } from '../index'
import DiscordAccount from '@riniya.ts/database/Social/DiscordAccount'

export default class CAuthMiddleware extends BaseMiddleware {

    public constructor() {
        super("ClientAuthentication", "Authentication middleware for the website")
    }

    public async handle(request: CustomRequest, response: Response, next) {
        let session = request.signedCookies['session'];
        if (isNull(session)) {
            return response.redirect("https://www.riniya.uk/user/login")
        } else {
            const account = await DiscordAccount.findOne({ _id: session.internal })
            if (isNull(account)) {
                return response.redirect("https://www.riniya.uk")
            }

            next()
        }
    }
}

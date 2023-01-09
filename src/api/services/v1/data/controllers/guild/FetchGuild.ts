import BaseController from "@riniya.ts/server/BaseController";
import Guild from "@riniya.ts/database/Guild/Guild";
import RouteBuilder from "@riniya.ts/utils/RouteBuilder";
import { Request, Response } from "express";

export default class FetchGuild extends BaseController {

    public constructor() {
        super(new RouteBuilder("guild/:guildId", true, "GET"))
    }

    public async handler(request: Request, response: Response) {
        if (this.validation(request, 'guildId'))
            return response.status(401).json(this.fetchError("MISSING_ID"));

        await Guild.findOne({ guildId: request.params['guildId'] }).then((guild) => {
            return response.status(200).json({
                status: true,
                data: guild
            });
        }).catch(() => {
            return response.status(200).json({
                status: false,
                message: "Guild not found."
            });
        });
    }
}
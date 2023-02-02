/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 02:39:31 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/02 05:55:31 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Tuple from "@riniya.ts/utils/Tuple";
import Logger from "@riniya.ts/logger";
import Riniya from "@riniya.ts";

import express from "express";
import https from "https";

import FileHelper from "@riniya.ts/utils/FileHelper";
import AbstractRoutes from "./Server/AbstractRoutes";
import ApiRoutes from "./Server/routes/api-routes";
import GuildRoutes from "./Server/routes/guild-routes";
import UserRoutes from "./Server/routes/user-routes";
import Authentication from "./Server/middlewares/Authentication";
import RequestLogging from "./Server/middlewares/RequestLogging";
import Websocket from "./Websocket/index";

const app = express();

export default class ServerManager {
    private routes: Tuple<AbstractRoutes> = new Tuple<AbstractRoutes>()
    private logger: Logger = Riniya.instance.logger
    private fileHelper: FileHelper = new FileHelper()

    private authClient: Authentication = new Authentication()
    private requestLog: RequestLogging = new RequestLogging()

    private server: https.Server = https.createServer({
        key: this.fileHelper.search(process.env.SERVER_KEY),
        cert: this.fileHelper.search(process.env.SERVER_CERT)
    }, app)

    private wsServer: https.Server = https.createServer({
        key: this.fileHelper.search(process.env.SERVER_KEY),
        cert: this.fileHelper.search(process.env.SERVER_CERT)
    })

    public readonly websocket: Websocket = new Websocket(this.wsServer)

    public constructor() {
        // DEBUG
        app.use(this.requestLog.handle);

        app.get('/', async (req, res) => {
            res.status(200).json({
                appName: 'Riniya',
                appVersion: Riniya.instance.version,
                appRevision: Riniya.instance.revision,
                appAuthors: ["NebraskyTheWolf <farfy.dev@gmail.com>"],
                services: {
                    redis: {
                        status: false,
                        ping: -1
                    },
                    minio: {
                        status: false,
                        ping: -1
                    },
                    mongodb: {
                        status: Riniya.instance.database.connection.readyState,
                        ping: -1
                    }
                }
            })
        })
        this.websocket.init()
    }

    public initServers(): void {
        this.routes.getAll().forEach((route) => {
            if (route.protected)
                app.use('/api', this.authClient.handle, route.routing())
            else
                app.use('/api', route.routing())
        })
        this.server.listen(process.env.PORT || 3000, () => {
            this.logger.info("The server is now listening.")
        })
        this.wsServer.listen(2052, () => {
            this.logger.info("The Websocket is now listening.")
        })
    }

    public registerServers(): void {
        this.routes.add(new ApiRoutes(false))
        this.routes.add(new GuildRoutes(true))
        this.routes.add(new UserRoutes(true))
    }

    public registerServer(server: AbstractRoutes): void {
        this.routes.add(server)
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 02:39:31 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/06 04:50:14 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Tuple from "@riniya.ts/utils/Tuple";
import Riniya from "@riniya.ts";

import express from "express";
import https from "https";

import FileHelper from "@riniya.ts/utils/FileHelper";
import AbstractRoutes from "./Server/AbstractRoutes";
import ApiRoutes from "./Server/routes/api-routes";
import GuildRoutes from "./Server/routes/guild-routes";
import UserRoutes from "./Server/routes/user-routes";
import RequestLogging from "./Server/middlewares/RequestLogging";
import Websocket from "./Websocket/index";

import session from "express-session"
import { v4 } from "uuid";
import AuthHelper, { ICallback } from "@riniya.ts/utils/AuthHelper";

const app = express();

export default class ServerManager {
    private routes: Tuple<AbstractRoutes>
    private server: https.Server
    private wsServer: https.Server
    private fileHelper: FileHelper

    private requestLog: RequestLogging

    public websocket: Websocket

    public constructor() {
        this.routes = new Tuple<AbstractRoutes>()
        this.fileHelper = new FileHelper()
        this.requestLog = new RequestLogging()

        // DEBUG
        app.set('trust proxy', 1) // trust first proxy
        app.use(session({
            secret: v4(),
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true }
        }))

        this.server = https.createServer({
            key: this.fileHelper.search(process.env.SERVER_KEY),
            cert: this.fileHelper.search(process.env.SERVER_CERT)
        }, app)

        this.wsServer = https.createServer({
            key: this.fileHelper.search(process.env.SERVER_KEY),
            cert: this.fileHelper.search(process.env.SERVER_CERT)
        }, app)

        this.websocket = new Websocket(this.wsServer)

        app.get('/', async (req, res) => {
            res.status(200).json({
                appName: 'Riniya',
                appVersion: Riniya.instance.version,
                appRevision: Riniya.instance.revision,
                appAuthors: ["NebraskyTheWolf <farfy.dev@gmail.com>"],
                services: {
                    redis: {
                        status: true
                    },
                    minio: {
                        status: true
                    },
                    mongodb: {
                        status: true
                    },
                    websocket: {
                        status: true,
                        clients: this.websocket.clients.length
                    }
                }
            })
        })
    }

    public initServers(): void {
        this.routes.getAll().forEach((route) => {
            app.use('/api', (req, res, next) => this.requestLog.handle(req, res, next), route.routing())
        })
        //
        this.server.listen(443)
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
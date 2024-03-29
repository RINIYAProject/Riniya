/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 02:39:31 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/15 11:17:01 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Tuple from "@riniya.ts/utils/Tuple";
import Riniya from "@riniya.ts";

import express from "express";
import http from "http";

import FileHelper from "@riniya.ts/utils/FileHelper";
import AbstractRoutes from "./Server/AbstractRoutes";
import ApiRoutes from "./Server/routes/api-routes";
import GuildRoutes from "./Server/routes/guild-routes";
import UserRoutes from "./Server/routes/user-routes";
import Websocket from "./Websocket/index";

import session from "express-session"
import { v4 } from "uuid";
import Authentication from "./Server/middlewares/Authentication";
import OsintRoutes from "./Server/routes/osint-routes";

import * as parser from "body-parser"

import RateLimit from "express-rate-limit"
import cors from 'cors';
import AuthRoutes from "./Server/routes/auth-routes";
import BlacklistRoutes from "./Server/routes/blacklist-routes";
import WebsiteServer from './website'

const app = express();
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    skipSuccessfulRequests: true,
    message: {
        status: false,
        error: "Too many request."
    }
})
app.use(limiter)

export default class ServerManager {
    private routes: Tuple<AbstractRoutes>
    private server: http.Server
    private readonly gateway: http.Server
    private fileHelper: FileHelper

    public websocket: Websocket

    public website: WebsiteServer

    public constructor() {
        this.routes = new Tuple<AbstractRoutes>()
        this.fileHelper = new FileHelper()
        this.website = new WebsiteServer()

        // DEBUG
        app.set('trust proxy', 1) // trust first proxy
        app.use(session({
            secret: v4(),
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true }
        }))
        app.set('view engine', 'pug');


      app.use(function (req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          // @ts-ignore
          res.setHeader('Access-Control-Allow-Credentials', true);
          next();
        });

        this.server = http.createServer(app)
        this.gateway = http.createServer()

        this.websocket = new Websocket(this.gateway)

        app.get('/', async (req, res) => {
            res.status(200).json({
                appName: 'Riniya',
                appVersion: Riniya.instance.version,
                appRevision: Riniya.instance.revision,
                appAuthors: ["NebraskyTheWolf <farfy.dev@gmail.com>"],
                appUptime: Riniya.instance.uptime || "Uptime is unreferenced",
                services: {
                    websocket: {
                        clients: this.websocket.clients.length,
                        environement: (this.websocket.wss.address() === "85.215.202.21" ? "production" : "debug")
                    }
                }
            })
        })

        app.post('/update', async (req, res) => {
            this.websocket.sendPacket("RTC_UPDATE_ACK", {
                action: 'git',
                data: req?.body || {}
            }, "*")
            res.status(200).end()
        })

        app.use(parser.json())
    }

    public initServers(): void {
        this.routes.getAll().forEach((route) => {
            if (route.isProtected) {
                app.use('/api', new Authentication().handle, route.routing())
            } else {
                app.use('/api', route.routing())
            }
        })

        this.server.listen(3443)
        this.gateway.listen(8443)
        this.website.initServer()
    }

    public registerServers(): void {
        this.routes.add(new ApiRoutes())
        this.routes.add(new AuthRoutes())
        this.routes.add(new BlacklistRoutes())
        this.routes.add(new GuildRoutes())
        this.routes.add(new UserRoutes())
        this.routes.add(new OsintRoutes())
    }

    public registerServer(server: AbstractRoutes): void {
        this.routes.add(server)
    }
}

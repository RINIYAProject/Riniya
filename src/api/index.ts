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
import https from "https";

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
import StorageRoutes from "./Server/routes/minio-routes";

import Minio from "minio"

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
    private server: https.Server
    private fileHelper: FileHelper
    private auth: Authentication

    public websocket: Websocket
    public readonly minioClient?: Minio.Client

    public constructor() {
        this.routes = new Tuple<AbstractRoutes>()
        this.fileHelper = new FileHelper()
        this.auth = new Authentication()

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

        this.websocket = new Websocket(this.server)

        /*
        this.minioClient = new Minio.Client({
            endPoint: process.env['MINIO_SERVER_HOST'],
            port: parseInt(process.env['MINIO_SERVER_PORT']),
            accessKey: process.env['MINIO_ACCESS_KEY'],
            secretKey: process.env['MINIO_SECRET_KEY']
        }) || undefined
        */


        this.checkBucket("avatars")
        this.checkBucket("banners")
        this.checkBucket("images")

        app.get('/', async (req, res) => {
            res.status(200).json({
                appName: 'Riniya',
                appVersion: Riniya.instance.version,
                appRevision: Riniya.instance.revision,
                appAuthors: ["NebraskyTheWolf <farfy.dev@gmail.com>"],
                appUptime: Riniya.instance.uptime || "Uptime is unreferenced",
                services: {
                    websocket: {
                        clients: this.websocket.clients.length
                    },
                    s3: {
                        status: process.env['MINIO_SERVER_ENABLED'] || false,
                        buckets: this.minioClient.listBuckets() || "S3 services is not initialized.",
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
            app.use('/api', (req, res, next) => this.auth.handle(req, res, next), route.routing())
        })
        this.server.listen(443)
    }

    public registerServers(): void {
        this.routes.add(new ApiRoutes(false))
        this.routes.add(new GuildRoutes(true))
        this.routes.add(new UserRoutes(true))
        this.routes.add(new OsintRoutes(true))
        //this.routes.add(new StorageRoutes(true))
    }

    public registerServer(server: AbstractRoutes): void {
        this.routes.add(server)
    }

    protected checkBucket(name: string) {
        if (process.env['MINIO_SERVER_ENABLED'] === undefined)
            return Riniya.instance.logger.warn("Skipping " + name + " bucket check ( S3 server is down ).")
        this.minioClient.bucketExists(name, result => {
            if (result.stack === undefined) {
                Riniya.instance.logger.info(name + " S3 bucket loaded.")
            } else {
                this.minioClient.makeBucket(name, process.env["MINIO_SERVER_REGION"], {
                    ObjectLocking: false
                }, result => {
                    Riniya.instance.logger.info(" [S3] : Error occurred when constructing the bucket " + result.name)
                })
            }
        })
    }
}
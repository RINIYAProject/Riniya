/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 02:39:31 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/09 08:24:40 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseController from "@riniya.ts/server/BaseController";
import BaseServer from "@riniya.ts/server/BaseServer";
import Tuple from "@riniya.ts/utils/Tuple";
import Logger from "@riniya.ts/logger";
import Riniya from "@riniya.ts";

import express from "express";
import https from "https";

import DataServer from "./services/v1/data/DataServer";
const app = express();

export default class ServerManager {
    private servers: Tuple<BaseServer>
    private server: https.Server
    private logger: Logger = Riniya.instance.logger

    public constructor() {
        this.servers = new Tuple<BaseServer>()
        app.get('/', (req, res) => {
            return res.status(200).json({
                name: "RiniyaAPI",
                version: Riniya.instance.version,
                authors: [
                    "NebraskyTheWolf"
                ],
                websocket: []
            })
        });
        this.server = https.createServer({}, app);
    }

    public initServers(): void {
        if (this.servers.getAll().size >= 1) {
            this.servers.getAll().forEach((server: BaseServer, uuid: string) => {
                this.logger.info("Loading api server " + uuid + "@" + server.getServer().getName() + ":" + server.getServer().getVersion() + "_" + server.getServer().getRevision());
                this.logger.info("Loading routes...");
                server.handler();
                if (server.getRoutes().getAll().size >= 1) {
                    server.getRoutes().getAll().forEach((route: BaseController, id: string) => {
                        this.logger.info(`[${uuid}@${id}] loading route ${route.getRoute().getRoute()}/${route.getRoute().getMethod().toUpperCase()}`);
                        app[route.getRoute().getMethod()](`/${server.getServer().getVersion()}/${server.getServer().getName()}/${route.getRoute().getRoute()}`, route.handler)
                    });
                } else {
                    this.logger.info(`[${uuid}@${server.getServer().getName()}] No routes available.`);
                }
                this.logger.info(`[${uuid}@${server.getServer().getName()}] registered.`);
            });
        } else {
            this.logger.info("No servers and routes available.");
        }

        this.server.listen(process.env.PORT || 3000, () => {
            this.logger.info("The server is now listening.");
        });
    }

    public registerServers(): void {
        this.registerServer(new DataServer());
    }

    public registerServer(server: BaseServer): void {
        this.servers.add(server)
    }
}
import express from 'express';
import https from 'https';
import WebSocket from 'ws';
import PayloadManager from './PayloadManager';
import Logger from '../utils/Logger';
import { StringDecoder } from "string_decoder"
import Payload from './components/Payload';

export declare type PayloadData = {
    key: string;
    data: Object;
}

export declare interface PayloadValidation {
    payload: PayloadData
}

export default class WebsocketServer {
    private app: express.Application;
    private server: https.Server
    private websocket: WebSocket.Server
    private logger: Logger
    private payloadManager: PayloadManager

    public constructor() {
        this.app = express();
        const server = https.createServer({}, this.app);
        this.server = server;
        this.websocket = new WebSocket.Server({ server });

        this.logger = new Logger("Websocket")
        this.payloadManager = new PayloadManager()
    }

    public load(): void {
        this.logger.info("Starting websocket server...")

        this.payloadManager.registerPayloads();
        this.payloadManager.registerMiddlewares();

        this.listenPayload();
    }

    private listenPayload(): void {
        this.websocket.on("connection", (ws: WebSocket) => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                this.logger.info(`WebSocket(${ws.ping}): Connection etablished.`);
                ws.on("message", (data: Buffer) => {
                    const decoder = new StringDecoder('utf8');
                    const buffer = new Buffer(data);
                    const payloadData: PayloadValidation = JSON.parse(decoder.write(buffer));
                    if (payloadData.payload !== undefined) {
                        const payload: Payload = this.payloadManager.payload(payloadData.payload.key)
                        if (payload.protected) {
                            ws.send(JSON.stringify({
                                sucess: false,
                                message: "Protected payload isn't supported yet."
                            }));
                        } else {
                            return payload.handle(ws, payloadData.payload)
                        }
                    }
                });
            }
        });

        this.server.listen(3000, () => {
            this.logger.info("WebSocket: listening on port 443");
        })
    }
}
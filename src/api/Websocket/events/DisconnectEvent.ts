import Riniya from "@riniya.ts";
import BaseWSEvent from "@riniya.ts/server/BaseWSEvent";
import { Socket } from "socket.io";

export default class DisconnectEvent extends BaseWSEvent {
    public constructor () {
        super("disconnect", "/payloads", (instance: Riniya, socket: Socket) => {
            this.getLogger().info(`Socket ${socket.id} is now disconnected`)
        })
    }
}
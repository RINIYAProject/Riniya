import BaseTask from "@riniya.ts/components/BaseTask";

export default class SessionTask extends BaseTask {
    public constructor() {
        super("KeepAlive", "KeepAlive for websocket clients", 30,
            async () => {
                if (this.instance.serverManager.websocket.clients.length >= 1) {
                    this.instance.serverManager.websocket.sendPacket("KEEP_ALIVE", {
                        time: Date.now()
                    }, "*")
                }
            })
    }
}
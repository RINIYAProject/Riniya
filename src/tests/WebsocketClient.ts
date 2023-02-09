import BaseTest, { Result } from './BaseTest'
import { Client } from '@cryb/mesa'


const socket = new Client(process.env['WEBSOCKET_URL'] || "wss://api.ghidorah.uk")

export default class WebsocketClient extends BaseTest {

    public counter = 0
    public reconnect = 5
    public messageCount = 0

    public connectId: NodeJS.Timeout
    public disconnectId: NodeJS.Timeout


    public constructor() {
        super("websocket_client")
    }

    protected handle(): void {
        socket.on("connected", () => {
            this.updateText("Connection etablished.")
            if (this.disconnectId)
                clearInterval(this.disconnectId)
            this.connectId = setInterval(() => {
                this.counter = this.counter + 1;
                this.updateText("Listening since " + this.counter + " seconds")
                if (this.messageCount >= 50)
                    this.updatePrefix("HANDSHAKE")
                else if (this.counter >= 50 && this.messageCount < 50) {
                    this.updateText("The debug operation has failed. Please check the server-side and try again.")
                    socket.disconnect(1006)
                }
            }, 1000)
        })

        socket.on('message', (message) => {
            if (message.type === "DEBUG")
                this.messageCount = this.messageCount + 1;
        });

        socket.on('error', (err) => {
            this.updateText("Error occured : " + err.message)
        })

        socket.on('disconnected', () => {
            clearInterval(this.connectId)
            this.disconnectId = setInterval(() => {
                this.reconnect = this.reconnect - 1;
                this.updateText("Disconnected : trying to reconnect in " + this.reconnect + "s")
                if (this.reconnect === 0) {
                    this.reconnect = 5
                    socket.connect()
                }
            }, 1000)
        })
    }
}

export const poc: WebsocketClient = new WebsocketClient()
import { Client, Message } from '@cryb/mesa'
import { serialize } from 'v8';

import ora from "ora"

export default class PoC {

    public counter = 0
    public reconnect = 5
    public messageCount = 0

    public connectId: NodeJS.Timeout
    public disconnectId: NodeJS.Timeout


    public constructor() {
        var spinner: ora.Ora = ora("Initializing").start()
        spinner.spinner = "clock"
        spinner.color = "red"

        process.on('uncaughtException', () => { })
        process.on('unhandledRejection', () => { })

        const socket = new Client(process.env['WEBSOCKET_URL'] || "wss://api.ghidorah.uk")

        socket.on("connected", () => {
            spinner.text = "Connection etablished."
            spinner.spinner = "dots"
            if (this.disconnectId)
                clearInterval(this.disconnectId)
            this.connectId = setInterval(() => {
                this.counter = this.counter + 1;
                spinner.text = "Listening since " + this.counter + " seconds"
                if (this.messageCount >= 50)
                    spinner.prefixText = `HANDSHAKE`
                spinner.color = "green"
            }, 1000)
        })

        socket.on('message', (message) => {
            this.messageCount = this.messageCount + 1;
        });

        socket.on('error', (err) => {
            spinner.fail("Error occured : " + err.message)
            process.exit()
        })

        socket.on('disconnected', () => {
            clearInterval(this.connectId)
            this.disconnectId = setInterval(() => {
                this.reconnect = this.reconnect - 1;
                spinner.text = "Disconnected : trying to reconnect in " + this.reconnect + "s"
                spinner.color = "red"
                spinner.spinner = "clock"
                if (this.reconnect === 0) {
                    this.reconnect = 5
                    socket.connect()
                }
            }, 1000)
        })
    }
}

export const poc: PoC = new PoC()
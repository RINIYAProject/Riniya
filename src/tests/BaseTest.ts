import ora from "ora"
import { v4 } from "uuid"

export declare type Result = "SUCCEED" | "FAILED" | "TIMEDOUT"

export default abstract class BaseTest {
    private readonly name: string
    private readonly spinner: ora.Ora
    private readonly instanceId: string
    private timer: number = 180

    public constructor(name: string) {
        this.name = name;

        this.spinner = ora("Initializing " + this.name + ".").start()
        this.spinner.spinner = "clock"
        this.spinner.color = "red"

        this.instanceId = v4()

        //process.on('uncaughtException', () => { })
        //process.on('unhandledRejection', () => { })

        this.updateTheme()

        var timeout = setInterval(() => {
            this.timer = this.timer - 1
            if (this.timer === 0) {
                process.send("base:" + this.instanceId + ":" + this.name + "/abort")
                this.spinner.fail(`${this.name} test timed out.`)
                clearInterval(timeout)
            }
        })
    }

    protected abstract handle(): void

    protected updateText(text: string): void {
        this.spinner.text = text
    }

    protected updateTheme(): void {
        this.spinner.spinner = "dots"
        this.spinner.color = "blue"
    }

    protected updatePrefix(prefix: string): void {
        this.spinner.prefixText = prefix
    }

    public getName(): string {
        return this.name
    }

    public getInstanceId(): string {
        return this.instanceId
    }
}
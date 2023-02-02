import BaseMiddleware from "../BaseMiddleware";
import { Request, Response } from "express";

export default class RequestLogging extends BaseMiddleware {

    public constructor() {
        super("RequestLogging", "Logging all the request in the console for debugging purposes.")
    }

    public handle(request: Request, response: Response, next): void {
        if (process.env.REQUEST_LOGGING === "ON") {
            this.formatLog(request)
        }
    }

    private formatLog(request: Request): void {
        this.instance.logger.info('===================================')
        this.instance.logger.info('=             API DEBUG           =')
        this.instance.logger.info('===================================')
        this.instance.logger.info(`Return code     : ${request.statusCode}`)
        this.instance.logger.info(`Route           : ${request.originalUrl}`)
        this.instance.logger.info(`Headers         : ${request.headers}`)
        this.instance.logger.info('===================================')
        this.instance.logger.info('=             BUILD INFO          =')
        this.instance.logger.info('===================================')
        this.instance.logger.info(`Version         : ${this.instance.version}`)
        this.instance.logger.info(`Revision        : ${this.instance.revision}`)
        this.instance.logger.info(`IsReady         : ${this.instance.loaded}`)
        this.instance.logger.info('===================================')
    }
}
import Base from "../../abstracts/Base";
import { Request, Response } from "express";

export default abstract class BaseWebMiddleware extends Base {
    public constructor(name: string, descirption?: string) {
        super(name, descirption, "SERVER")
    }

    public abstract handle(request: Request, response: Response, next): void
}

import Base from "../../abstracts/Base";
import { Request, Response } from "express";
import AbstractRoutes from "./AbstractRoutes";

export default abstract class BaseMiddleware extends Base {
    public constructor(name: string, descirption?: string) {
        super(name, descirption, "SERVER")
    }

    public abstract handle(route: AbstractRoutes, request: Request, response: Response, next): void
}
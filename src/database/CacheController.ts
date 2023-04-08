import Riniya from "@riniya.ts";
import OptionMap from "@riniya.ts/utils/OptionMap";
import BaseManager from "./cache/BaseManager";
import SessionManager from "./cache/SessionManager";
import VerificationManager from "./cache/VerificationManager";

export default class CacheController {
    protected readonly controllers: OptionMap<String, BaseManager<unknown>>

    public constructor() {
        this.controllers = new OptionMap<String, BaseManager<unknown>>()

        //TODO: Fix the verification checks
        //this.controllers.add("verifications", new VerificationManager())
        
        this.controllers.add("sessions", new SessionManager())
    }

    public initialize(): void {
        this.controllers.getMap().forEach(controller => controller.init())
        Riniya.instance.logger.info("[CacheController] : " + this.controllers.size() + " initialized.")
    }

    public getController(name: string): BaseManager<unknown> {
        if (!this.controllers.getMap().has(name))
            throw new Error(name + " is not registered as a `CacheController`.")
        return this.controllers.get(name)
    }
}
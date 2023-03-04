import { getInstance, getLogger } from "@riniya.ts/types";
import OptionMap from "@riniya.ts/utils/OptionMap";
import Tuple from "@riniya.ts/utils/Tuple";
import BaseManager from "./BaseManager";
import Session from "./Models/Security/Session";
import { Session as ISession } from "./Models/Security/Session";

export declare type SessionSlot = {

}

export default class SessionManager extends BaseManager {

    private readonly sessions: OptionMap<String, ISession>

    public constructor() {
        super("SessionManager", "auth", 280, "session-list")

        this.sessions = new OptionMap<String, ISession>()
    }

    public init() {
        this.timeoutCache.getAll().forEach(intr => clearInterval(intr))
        this.cache.exists("session-list").then(result => {
            if (result) {
                this.cache.getObject<ISession[]>("session-list").then(documents => {
                    getLogger().info("[SessionManager] : Loading " + documents.objectId + " cache object.")
                    getLogger().info("[SessionManager] : Metadata " + documents.objectId + ", created at " + documents.cachedAt + ", tuple-size=" + documents.data.length)

                    documents.data.map(x => {
                        getLogger().info("[SessionManager] : Fetching " + x.userId + "...")
                        this.sessions.add(documents.objectId, x)
                    })

                    getLogger().info("[SessionManager] : " + documents.objectId + " has been loaded.")
                }).catch((reason) => {
                    getLogger().error("[SessionManager] : " + reason + ", Aborting operation.")
                })
            } else {
                this.load();
            }
        })
        this.process()
    }

    protected async load() {
        const forms: ISession[] = (await Session.find({
            sessionExpired: false
        })).map(x => {
            return {
                userId: x.userId,
                accessToken: x.accessToken,
                clientToken: x.clientToken,
                sessionExpiry: x.sessionExpiry,
                sessionExpired: x.sessionExpired
            }
        })

        this.cache.addObject<ISession[]>("session-list", forms, 250).then(result => {
            getLogger().info("[SessionManager] : " + result.length + " sessions added.")
        })
    }

    protected async process() {
        this.cache.getObject<ISession[]>("session-list").then(result => {
            getLogger().info("[SessionManager] : Processing objects in " + result.objectId)
            result.data.forEach(x => {
                this.timeoutCache.add(setInterval(async () => {
                    if (!x.sessionExpired) {
                        var countDown = x.sessionExpiry -= 1
                        await this.updateTime(x.clientToken, countDown, false)
        
                        if (countDown === 0) {
                            await this.updateTime(x.clientToken, x.sessionExpiry, true)
                            return getLogger().info("[SessionManager] : " + x.clientToken + " has been deactivated.")   
                        }
                    }
                }, 1000))
            })
        })
    }

    protected async updateTime(id: string, time: number, expired: boolean): Promise<Boolean> {
        let ok: Boolean = false
        await Session.updateOne({
            clientToken: id
        }, {
            sessionExpiry: time,
            sessionExpired: expired
        }).then(document => {
            ok = document.acknowledged
        })
        return ok
    }
}
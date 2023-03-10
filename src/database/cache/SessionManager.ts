import { getLogger } from "@riniya.ts/types";
import OptionMap from "@riniya.ts/utils/OptionMap";
import BaseManager from "./BaseManager";
import Session from "../Models/Security/Session";
import { Session as ISession } from "../Models/Security/Session";

export default class SessionManager extends BaseManager<ISession[]> {

    private readonly sessions: OptionMap<String, ISession>

    public constructor() {
        super("SessionManager", "auth", 280, "session-list")

        this.sessions = new OptionMap<String, ISession>()
    }

    public init() {
        this.has().then(result => {
            if (result) {
                this.getObject().then(documents => {
                    getLogger().info("[SessionManager] : Loading " + documents.objectId + " cache object.")
                    getLogger().info("[SessionManager] : Metadata " + documents.objectId + ", created at " + documents.cachedAt + ", tuple-size=" + documents.data.length)

                    documents.data.map(x => {
                        getLogger().info("[SessionManager] : Fetching " + x.clientToken.split("-")[0] + "...")
                        this.sessions.add(documents.objectId, x)
                    })

                    getLogger().info("[SessionManager] : " + documents.objectId + " has been loaded.")
                    this.process()
                })
            } else {
                this.load()
                this.init()
            }
        })
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

        this.addObject(forms).then(result => {
            getLogger().info("[SessionManager] : " + result.length + " sessions added.")
        })
    }

    protected async process() {
        this.getObject().then(result => {
            getLogger().info("[SessionManager] : Processing objects in " + result.objectId)
            result.data.forEach(x => {
                var inter = setInterval(async () => {
                    const uniqueId = inter;
                    var countDown = x.sessionExpiry -= 1
                    await this.updateTime(x.clientToken, countDown, false)

                    if (countDown === 0) {
                        await this.updateTime(x.clientToken, x.sessionExpiry, true)
                        getLogger().info("[SessionManager] : " + x.clientToken + " has been deactivated.")
                        clearInterval(uniqueId)
                    }
                }, 1000)
                this.timeoutCache.add(inter)
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
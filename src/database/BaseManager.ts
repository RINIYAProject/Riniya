import CacheManager from "@riniya.ts/cache";
import { getLogger } from "@riniya.ts/types";
import Tuple from "@riniya.ts/utils/Tuple";

export default abstract class BaseManage {

    protected readonly name: string;
    protected readonly cache: CacheManager
    protected readonly timeoutCache: Tuple<NodeJS.Timeout>

    public constructor(name: string, prefix: string, resetTime: number, objectName: string) {
        this.name = name
        this.cache = new CacheManager(prefix)
        this.timeoutCache = new Tuple<NodeJS.Timeout>()

        setInterval(() => {
            getLogger().info(`[${this.name}] : Refreshing cache...`)
            this.cache.removeObject(objectName).then(result => {
                if (result) {
                    this.init()
                }
            })
            getLogger().info(`[${name}] : Cache refreshed.`)
        }, resetTime * 1000)
    }

    protected abstract load()
    public abstract init()
    protected abstract process()
}
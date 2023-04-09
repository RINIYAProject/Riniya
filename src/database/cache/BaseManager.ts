import CacheManager, { CacheItem } from "../../cache/CacheManager";
import { getLogger } from "@riniya.ts/types";
import Tuple from "@riniya.ts/utils/Tuple";

export default abstract class BaseManager<T> {

    private readonly name: string
    private readonly objectName: string
    private readonly resetTime: number
    private readonly cache: CacheManager
    
    protected readonly timeoutCache: Tuple<NodeJS.Timeout>

    public constructor(name: string, prefix: string, resetTime: number, objectName: string) {
        this.name = name
        this.objectName = objectName
        this.resetTime = resetTime;
        this.cache = new CacheManager(prefix)
        this.timeoutCache = new Tuple<NodeJS.Timeout>()

        setInterval(() => {
            getLogger().info(`[${this.name}] : Refreshing cache...`)
            this.cache.removeObject(objectName).then(result => {
                if (result) {
                    this.init()
                }
            })
        }, resetTime * 1000)
    }

    protected async getObject(): Promise<CacheItem<T>> {
        return this.cache.getObject<T>(this.objectName)
    }

    protected async addObject(object: T): Promise<T> {
        return this.cache.addObject<T>(this.objectName, object, this.resetTime)
    }

    protected async delete(): Promise<Boolean> {
        return this.cache.removeObject(this.objectName)
    }

    protected async has(): Promise<Boolean> {
        return this.cache.exists(this.objectName)
    }

    public abstract init()
    protected abstract load()
    protected abstract process()
}
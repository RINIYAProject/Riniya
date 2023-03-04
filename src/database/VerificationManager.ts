import Riniya from "@riniya.ts";
import CacheManager from "../cache/CacheManager";
import { getInstance, getLogger } from "@riniya.ts/types";
import OptionMap from "@riniya.ts/utils/OptionMap";
import Tuple from "@riniya.ts/utils/Tuple";
import Verification, { Verification as IVerification } from "./Models/Guild/Verification";
import { MessageEmbed, Snowflake, User } from "discord.js";
import BaseManager from "./BaseManager";

export declare type Answer = {
    title: string;
    content: string;
}

export declare type CacheSlot = {
    guildId: string;
    memberId: string;
    memberName: string;
    issuerId: string;
    issuerName: string;
    answers: Object,
    status: string;
    registeredAt: number;
    updatedAt: number;
    expireAt: number;
}

export default class VerificationManager extends BaseManager {
    private readonly users: OptionMap<String, IVerification>

    public constructor() {
        super("VerificationManager", "verification", 280, "users-list")
    }

    public init() {
        this.timeoutCache.getAll().forEach(intr => clearInterval(intr))
        this.cache.exists("users-list").then(result => {
            if (result) {
                this.cache.getObject<CacheSlot[]>("users-list").then(documents => {
                    getLogger().info("[VerificationManager] : Loading " + documents.objectId + " cache object.")
                    getLogger().info("[VerificationManager] : Metadata " + documents.objectId + ", created at " + documents.cachedAt + ", tuple-size=" + documents.data.length)

                    documents.data.map(x => {
                        getLogger().info("[VerificationManager] : Fetching " + x.memberId + " verification form.")
                        this.users.add(documents.objectId, x)
                    })

                    getLogger().info("[VerificationManager] : " + documents.objectId + " has been loaded.")
                }).catch((reason) => {
                    getLogger().error("[VerificationManager] : " + reason + ", Aborting operation.")
                })
            } else {
                this.load();
            }
        })

        this.process();
    }

    protected async load() {
        const forms: CacheSlot[] = (await Verification.find({
            status: "pending"
        })).map(x => {
            return {
                guildId: x.guildId,
                memberId: x.memberId,
                memberName: x.memberName,
                issuerId: x.issuerId,
                issuerName: x.issuerName,
                answers: x.answers,
                status: x.status,
                registeredAt: x.registeredAt,
                updatedAt: x.updatedAt,
                expireAt: x.expireAt  
            }
        })

        if (forms.length < 1) {
            return getLogger().warn("[VerificationManager] : No forms detected, Skipping.")
        }

        this.cache.addObject<CacheSlot[]>("users-list", forms, 280 * 1000).then(result => {
            Riniya.instance.logger.info("[VerificationManager] : " + result.length + " forms loaded.")
        }).catch((reason) => {
            Riniya.instance.logger.info("[VerificationManager] : " + reason)
        })
    }

    protected process() {
        this.cache.getObject<CacheSlot[]>("users-list").then(result => {
            Riniya.instance.logger.info("[VerificationManager] : Processing objects in " + result.objectId)
            result.data.forEach(x => {
                this.timeoutCache.add(setInterval(async () => {
                    var countDown = x.expireAt -= 1
                    await this.updateTime(x.memberId, countDown)
    
                    if (countDown === 43200) {
                        this.sendNotification(x.memberId, countDown)
                    } else if (countDown === 21600) {
                        this.sendNotification(x.memberId, countDown)
                    } else if (countDown === 11600) {
                        this.sendNotification(x.memberId, countDown)
                    } else if (countDown === 60 * 2) {
                        this.sendNotification(x.memberId, countDown)
                    }
                }, 1000))
            })
        })
    }

    protected sendNotification(userId: Snowflake, time: number): void {
        let user: User = Riniya.instance.users.cache.get(userId)
        user.send({
            embeds: [
                new MessageEmbed()
                    .setAuthor("Please don't forget to verify your account.")
                    .setDescription(`Hello ${user.username}, 
                        You have joined 'The Vakea Lounge' but forgot to verify your account.

                        Please verify your account so that you are not locked out of the server.
                        
                        You must do this before the time limit indicated below`
                    )
                    .setColor("ORANGE")
                    .addField("Expire in", `${new Date(time * 1000).getHours()} hours.`)
            ]
        })
    }

    protected async updateTime(id: string, time: number): Promise<Boolean> {
        let ok: Boolean = false
        await Verification.updateOne({
            memberId: id
        }, {
            expireAt: time
        }).then(document => {
            ok = document.acknowledged
        })
        return ok
    }
}
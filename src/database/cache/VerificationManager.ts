import Riniya from "@riniya.ts";
import { getLogger } from "@riniya.ts/types";
import OptionMap from "@riniya.ts/utils/OptionMap";
import Verification, { Verification as IVerification } from "../Models/Guild/Verification";
import { Guild, GuildMember, MessageEmbed, Snowflake, User } from "discord.js";
import BaseManager from "./BaseManager";

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

export default class VerificationManager extends BaseManager<CacheSlot[]> {
    private readonly users: OptionMap<String, IVerification>

    public constructor() {
        super("VerificationManager", "verification", 280, "users-list")
    }

    public init() {
        this.users.getMap().clear()

        this.has().then(result => {
            if (result) {
                this.getObject().then(documents => {
                    getLogger().info("[VerificationManager] : Loading " + documents.objectId + " cache object.")
                    getLogger().info("[VerificationManager] : Metadata " + documents.objectId + ", created at " + documents.cachedAt + ", tuple-size=" + documents.data.length)

                    documents.data.map(x => {
                        this.users.add(documents.objectId, x)
                    })

                    this.process();
                })
            } else {
                this.load()
                this.init()
            }
        })
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

        this.addObject(forms).then(result => {
            Riniya.instance.logger.info("[VerificationManager] : " + result.length + " forms loaded.")
        }).catch((reason) => {
            Riniya.instance.logger.info("[VerificationManager] : " + reason)
        })
    }

    protected process() {
        this.getObject().then(result => {
            Riniya.instance.logger.info("[VerificationManager] : Processing objects in " + result.objectId)
            result.data.forEach(x => {
                var inter = setInterval(async () => {
                    const uniqueId = inter
                    var countDown = x.expireAt -= 1
                    await this.updateTime(x.memberId, countDown)
    
                    if (countDown === 43200) {
                        this.sendNotification(x.memberId, x.guildId, countDown)
                    } else if (countDown === 21600) {
                        this.sendNotification(x.memberId, x.guildId, countDown)
                    } else if (countDown === 11600) {
                        this.sendNotification(x.memberId, x.guildId, countDown)
                    } else if (countDown === 60 * 2) {
                        this.sendNotification(x.memberId, x.guildId, countDown)
                    } else if (countDown === 0) {
                        clearInterval(uniqueId)
                    }
                }, 1000)
                this.timeoutCache.add(inter)
            })
        })
    }

    protected sendNotification(userId: Snowflake, guildId: Snowflake, time: number): void {
        let guild: Guild = Riniya.instance.guilds.cache.get(guildId)
        let member: GuildMember = guild.members.cache.get(userId);

        if (time === 0) {
            member.send({
                content: "You have been kicked due to verification inactivity."
            })
            member.kick("Verification timed out.")
        }
        
        member.send({
            embeds: [
                new MessageEmbed()
                    .setAuthor("Please don't forget to verify your account.")
                    .setDescription(`Hello ${member.user.username}, 
                        You have joined '${guild.name}' but forgot to verify your account.

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
        let expired: Boolean = (time === 0 ? true : false)
        await Verification.updateOne({
            memberId: id
        }, {
            expireAt: time,
            status: (expired ? "timedout" : "pending")
        }).then(document => {
            ok = document.acknowledged
        })
        return ok
    }
}
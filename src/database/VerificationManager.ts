import Riniya from "@riniya.ts";
import Tuple from "@riniya.ts/utils/Tuple";
import Verification, { Verification as IVerification} from "./Models/Guild/Verification";

export default class VerificationManager {

    private readonly cache: Tuple<IVerification>
    private readonly timeoutCache: Tuple<NodeJS.Timeout>

    public constructor() {
        this.cache = new Tuple<IVerification>()

        Verification.find().then(documents => {
            documents.map(x => {
                this.cache.add({
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
                })
            })
        })

        Riniya.instance.logger.info("[VerificationManager] : " + this.cache.getAll().size + " object loaded.")
        this.processTimeout();
    }

    protected processTimeout() {
        this.cache.getAll().map(x => {
            this.timeoutCache.add(setInterval(() => {
                let countDown = x.expireAt - 1
                let acknowledged = this.updateTime(x.memberId, countDown)

                Riniya.instance.logger.info("DEBUG: memberName === " + x.memberName + " ,countDown === " + countDown + ", acknowledged === " + acknowledged)

                if (countDown === 50) {
                    Riniya.instance.logger.info("DEBUG: countDown === 50")
                }

            }, 1000))
        })
    }

    protected updateTime(id: string, time: number): boolean {
        Verification.updateOne({
            memberId: id
        }, {
            expireAt: time
        }).then(document => {
            return document.acknowledged
        })
        return false
    }
}
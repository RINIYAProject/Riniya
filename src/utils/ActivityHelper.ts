import Riniya from "@riniya.ts";
import Activity from "@riniya.ts/database/Guild/Activity";
import { Snowflake } from "discord.js"

export default class AcitivityHelper {
    private type: String
    private owner: Snowflake
    private content: String

    public setType(type: String): AcitivityHelper {
        this.type = type;
        return this;
    }

    public setOwner(ownerId: Snowflake): AcitivityHelper {
        this.owner = ownerId;
        return this;
    }

    public setContent(content: String): AcitivityHelper {
        this.content = content;
        return this;
    }

    public async save(guildId: Snowflake): Promise<{
        status: boolean
        result?: String
    }> {
        return await new Activity({
            guildId: guildId,
            memberId: this.owner,
            type: this.type,
            action: this.content,
            registeredAt: Date.now()
        }).save().then(result => {
            Riniya.getInstance().serverManager.websocket.sendPacket("RTC_ACTIVITY_ACK", {
                guildId: guildId,
                ownerId: this.owner,
                activity: result._id
            }, "*")
            return {
                status: true,
                result: result._id
            } 
        }).catch(err => {
            return {
                status: false
            }
        })
    }
}
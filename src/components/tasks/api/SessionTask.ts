import BaseTask from "@riniya.ts/components/BaseTask";
import Member from "@riniya.ts/database/Guild/Member";

export default class SessionTask extends BaseTask {
    public constructor() {
        super("MemberSync", "Syncing member lists.", 180,
            async () => {
                this.instance.guilds.cache.forEach(result => {
                    result.members.cache.forEach(async member => {
                        await Member.updateOne({
                            guildId: result.id,
                            memberId: member.id
                        }, {
                            $set: {
                                username: member.user.username,
                                identifier: member.user.discriminator,
                                avatar: member.avatarURL(),
                                hexColor: member.user.accentColor
                            }
                        });
                    })
                })
                this.instance.serverManager.websocket.sendPacket("RTC_MEMBERS_ACK", {  }, "*")
            })
    }
}
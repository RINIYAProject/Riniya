import BaseTask from "@riniya.ts/components/BaseTask";
import Member from "@riniya.ts/database/Guild/Member";

export default class SessionTask extends BaseTask {
    public constructor() {
        super("MemberSync", "Syncing member lists.", 180,
            async () => {
                this.instance.guilds.cache.forEach(result => {
                    result.members.cache.forEach(async member => {
                        await Member.deleteOne({ guildId: result.id, memberId: member.id })
                        new Member({
                            guildId: result.id,
                            memberId: member.id,
                            username: member.user.username,
                            identifier: member.user.discriminator,
                            avatar: member.avatarURL({ format: 'png', size: 128 }),
                            hexColor: member.user.accentColor
                        }).save()
                    })
                })
                this.instance.serverManager.websocket.sendPacket("RTC_MEMBERS_ACK", {  }, "*")
            })
    }
}
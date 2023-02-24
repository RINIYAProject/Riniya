import BaseTask from "@riniya.ts/components/BaseTask";
import Member from "@riniya.ts/database/Guild/Member";

export default class SessionTask extends BaseTask {
    public constructor() {
        super("MemberSync", "Syncing member lists.", "* * 2 * * *",
            async () => {
                this.instance.guilds.cache.forEach(result => {
                    result.members.cache.forEach(async member => {
                        await Member.deleteOne({ guildId: result.id, memberId: member.id })
                        new Member({
                            guildId: result.id,
                            memberId: member.id,
                            username: member.user.username,
                            avatar: member.avatarURL({ format: 'png', size: 128 }),
                            banner: member.user.bannerURL({ format: 'png' }),
                            hexColor: member.user.accentColor
                        })
                    })
                })
                this.instance.serverManager.websocket.sendPacket("RTC_MEMBERS_ACK", {  }, "*")
            })
    }
}
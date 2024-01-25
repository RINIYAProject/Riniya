import BaseTask from "@riniya.ts/components/BaseTask";
import Member from "@riniya.ts/database/Guild/Member";
import Session from '@riniya.ts/database/Security/Session'
import moment from 'moment/moment'
import Riniya from '@riniya.ts'
import Message from '@riniya.ts/database/Common/Message'

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

          const sessions = await Session.find({
            sessionExpired: false
          })
          sessions.forEach(async (element) => {
            let minutes: number = moment().diff(moment(element.sessionExpiry), 'minutes');
            if (minutes >= 10) {
              await Session.updateOne({ _id: element._id }, { $set: { sessionExpired: true } })
              Riniya.instance.logger.info(`Session : ${element._id} is now expired.`)
            }
          })

          const messages = await Message.find()
          messages.forEach(async message => {
            let month: number = moment().diff(moment(message.registeredAt), 'months');
            if (month >= 6) {
              await Message.deleteOne({ _id: message._id })
              Riniya.instance.logger.info(`Message : ${message._id} is now expired and got deleted.`)
            }
          })

          this.instance.serverManager.websocket.sendPacket("RTC_MEMBERS_ACK", {}, "*")
        })
    }
}

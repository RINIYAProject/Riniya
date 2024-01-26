import BaseTask from "@riniya.ts/components/BaseTask";
import Guild from '@riniya.ts/database/Guild/Guild'
import { isNull } from '@riniya.ts/types'

// @ts-ignore
export default class GuildResync extends BaseTask {
  public constructor() {
    super("GuildResync", "Syncing guilds", 180,
      async () => {
        this.instance.guilds.cache.forEach(async result => {
          const guild = await Guild.exists({ guildId: result.id })

          if (isNull(guild)) {
            new Guild({
              guildId: result.id,
              ownerId: result.ownerId
            }).save().catch(err => console.error('Failed to save ' + result.id + ' guild'))
          }
        })

        this.instance.serverManager.websocket.sendPacket("RTC_GUILD_SYNC_ACK", {}, "*")
      })
  }
}

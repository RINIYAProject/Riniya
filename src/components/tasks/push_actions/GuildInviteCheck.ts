import BaseTask from "@riniya.ts/components/BaseTask";
import Invites from "@riniya.ts/database/Moderation/Invites";
import Session from "@riniya.ts/database/Security/Session";
import { MessageEmbed } from "discord.js";
import { v4 } from "uuid";

export default class GuildInviteCheck extends BaseTask {

    public constructor() {
        super("GuildInviteCheck", "Check for unhandler invite.", "30 * * * * *",
            async () => {
                this.instance.logger.info(this.name + '@' + this.description + ' : Job started.');
                this.instance.guilds.cache.forEach(guild => {
                    if (guild.id === "1071173995539484702") {
                        guild.invites.cache.forEach(async invite => {
                            let inv = await Invites.findOne({
                                guildId: guild.id,
                                inviteCode: invite.code
                            })
                            if (!inv) {
                                guild.invites.delete(invite.code, "Compromised invite.");
                                const message: MessageEmbed = new MessageEmbed()
                                message.setTitle(`Job ${v4()} compromised invite detected.`)
                                message.setColor("RED")
                                message.setDescription("This invite is not made by the command.");
                                message.addField("Created by", `${invite.inviter.username}.`)
                                message.setAuthor(`${invite.code} has been deleted.`)
                                guild.systemChannel.send({
                                    embeds: [message]
                                })
                            }
                        })
                    } else {
                        this.instance.logger.info(this.name + '@' + this.description + ' : Skipping guild ' + guild.id);
                    }
                })
                this.instance.logger.info(this.name + '@' + this.description + ' : Job finished.');
            })
    }
}
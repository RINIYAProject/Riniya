import Riniya from "@riniya.ts";
import BaseTask from "@riniya.ts/components/BaseTask";
import Verification from "@riniya.ts/database/Guild/Verification";
import { MessageEmbed } from "discord.js";
import moment from "moment";

export default class VerificationTask extends BaseTask {
    public constructor() {
        super("Verification", "Kick member after expiration.", 30,
            async () => {
                this.instance.guilds.cache.forEach(result => {
                    result.members.cache.forEach(async member => {
                        const data = await Verification.findOne({
                            guildId: result.id,
                            memberId: member.id,
                            status: 'pending'
                        });
                        let hours: number = moment().diff(moment(data.expireAt), 'hours');
                        if (hours >= 12) {
                            await Riniya.instance.users.cache.get(member.id).send({
                              embeds: [
                                new MessageEmbed()
                                  .setTitle('First Verification Warning.')
                                  .setColor('ORANGE')
                                  .setDescription('Please verify your account before 24 hours, otherwise you will be kicked from ' + result.name)
                              ]
                            })
                        } else if (hours >= 24) {
                            await Riniya.instance.users.cache.get(member.id).send({
                              embeds: [
                                new MessageEmbed()
                                  .setTitle('Verification timedout.')
                                  .setColor('RED')
                                  .setDescription('You got kicked from ' + result.name + ', because you haven\'t verified your account.')
                              ]
                            })
                            await member.kick('Verification timedout.')
                            await Verification.deleteOne({
                                _id: data._id
                            })
                        }
                    })
                })
                Riniya.instance.logger.info('Verification purge, executed!')
            })
    }
}

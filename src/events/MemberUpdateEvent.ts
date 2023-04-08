import BaseEvent from "@riniya.ts/components/BaseEvent";
import { Guild as DGuild, GuildMember, MessageEmbed, TextChannel } from "discord.js";

export default class MemberUpdateEvent extends BaseEvent {
    public constructor() {
        super("guildMemberUpdate", async (oldMember: GuildMember, newMember: GuildMember) => {
            if (oldMember.premiumSince !== newMember.premiumSince) {
                const handle: DGuild = this.instance.guilds.cache.get("1052173534299947008")
                const channel: TextChannel = handle.channels.cache.get("1052173988756992050") as TextChannel
                channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setAuthor(newMember.user.username + " boosted this serber.")
                            .setDescription(`Thank you <@${newMember.id}> for boosting this server X3`)
                            .setColor("DARK_VIVID_PINK")
                    ],
                    components: [
                        {
                            type: 1,
                            components: [
                                this.instance.buttonManager.createLinkButton("Profile", "https://www.riniya.uk/profile/" + handle.id + "/" + newMember.id),
                                this.instance.buttonManager.createLinkButton("Website", "https://www.riniya.uk")
                            ]
                        }
                    ]
                })
            }
        });
    }
}
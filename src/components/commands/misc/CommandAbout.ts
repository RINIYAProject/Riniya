import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap";
import { GuildMember, Guild, CommandInteraction, MessageButton, MessageEmbed } from "discord.js";

export default class CommandAbout extends BaseCommand {
    public constructor() {
        super("about", "Displaying the bot information", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        const message: MessageEmbed = new MessageEmbed()
            .setTitle("Riniya - About")
            .setDescription("Thank you for paying attention to Riniya, here you will find all the information and link of the service")
            .addField("Version", this.instance.version, true)
            .addField("Author", "Vakea#0365", true)
            .setColor("#36393f");

        const website: MessageButton = new MessageButton()
            .setURL("https://www.riniya.bot")
            .setLabel("Website")
            .setStyle("LINK");

        const dashboard: MessageButton = new MessageButton()
            .setURL("https://dashboard.riniya.bot")
            .setLabel("Dashboard")
            .setStyle("LINK");

        const documentation: MessageButton = new MessageButton()
            .setURL("https://doc.riniya.bot")
            .setLabel("Documentation")
            .setStyle("LINK");

        const report: MessageButton = new MessageButton()
            .setURL("https://report.riniya.bot")
            .setLabel("Report")
            .setStyle("LINK");

        inter.reply({
            "components": [
                {
                    "type": 1,
                    "components": [
                        website,
                        dashboard,
                        documentation,
                        report
                    ]
                }
            ],
            embeds: [message]
        });
    }
}
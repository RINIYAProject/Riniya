/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandAbout.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:05:52 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:30:27 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import { GuildMember, Guild, CommandInteraction, MessageButton, MessageEmbed } from "discord.js";

export default class CommandAbout extends BaseCommand {
    public constructor() {
        super("about", "Displaying the bot information", new OptionMap<string, boolean>,
            "MISC"
        );
    }

    async handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        const message: MessageEmbed = new MessageEmbed()
            .setTitle("Riniya - About")
            .setDescription("Thank you for paying attention to Riniya, there you will find all the information and link of the service")
            .addField("Version", this.instance.version, true)
            .addField("Author", "NebraskyTheWolf", true)
            .setColor("#36393f");

        const website: MessageButton = new MessageButton()
            .setURL("https://www.riniya.uk")
            .setLabel("Website")
            .setStyle("LINK");

        const dashboard: MessageButton = new MessageButton()
            .setURL("https://dashboard.riniya.uk")
            .setLabel("Dashboard")
            .setStyle("LINK");

        const documentation: MessageButton = new MessageButton()
            .setURL("https://docs.riniya.uk")
            .setLabel("Documentation")
            .setStyle("LINK");

        const report: MessageButton = new MessageButton()
            .setURL("https://github.com/RINIYAProject/Riniya/issues/new")
            .setLabel("Issues")
            .setStyle("LINK");

        const github: MessageButton = new MessageButton()
            .setURL("https://github.com/RINIYAProject/Riniya")
            .setLabel("Repository")
            .setStyle("LINK");

        await inter.reply({
          "components": [
            {
              "type": 1,
              "components": [
                website,
                dashboard,
                documentation,
                report,
                github
              ]
            }
          ],
          embeds: [message]
        });
    }
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandHelp.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:05:55 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:30:46 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { ToAPIApplicationCommandOptions } from "@discordjs/builders";
import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import Tuple from "@riniya.ts/utils/Tuple";
import { ComponentType } from "abstracts";
import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";

export declare type ICommand = {
    name: string
    description: string
    type: ComponentType
    options?: ToAPIApplicationCommandOptions[]
}

export default class CommandHelp extends BaseCommand {
    public constructor() {
        super("help", "Look at the command help.", new OptionMap<string, boolean>,
            "MISC"
        );
    }

    private readonly groups: OptionMap<String, ICommand> = new OptionMap<String, ICommand>()

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {

        // COMMAND GROUPS PROCESSOR 
        this.instance.manager.toList().map(x => {
            this.groups.add(x.category, {
                name: x.name,
                description: x.description,
                type: x.type,
                options: x.options
            })
        })

        const categories = this.instance.manager.groups.getMap().map(x => {
            var unrecognised = x.replace(" ", "")
                                    .replace("&", "_")
                                    .toLowerCase()
            return {
                type: 1,
                components: [
                    this.instance.buttonManager.createButton(`${x}`, unrecognised)
                ]
            }
        })

        inter.reply({
            components: [
                {
                    type: 1,
                    components: [
                        this.instance.buttonManager.createLinkButton("Report a issue", "https://github.com/RINIYAProject/Riniya/issues/new"),
                        this.instance.buttonManager.createLinkButton("Documentation", "https://docs.riniya.uk"),
                        this.instance.buttonManager.createLinkButton("Dashboard", "https://dashboard.riniya.uk"),
                        this.instance.buttonManager.createLinkButton("Commands", "https://www.riniya.uk/commands")
                    ]
                },
                ...categories
            ],
            embeds: [
                new MessageEmbed()
                    .setTitle("Riniya - Help")
                    .setDescription("There is all the link that will help you to setup Riniya.")
                    .addField("Version", this.instance.version, true)
                    .addField("Latency", `${this.instance.ws.ping}`, true)
                    .setColor("#36393f")
            ]
        });
    }
}
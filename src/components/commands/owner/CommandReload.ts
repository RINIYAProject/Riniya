/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandReload.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:51 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:53:26 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";

import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandReload extends BaseCommand {
    public constructor() {
        super("reload", "Reload the bot", new OptionMap<string, boolean>()
            .add("isDeveloper", true),
            "OWNER"
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        this.instance.reload();
        return inter.reply({
            content: "Reloading...",
            ephemeral: true
        });
    }
}
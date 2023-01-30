/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandPause.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:00 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:31:21 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandPause extends BaseCommand {
    public constructor() {
        super("pause", "Pause the music", new OptionMap<string, boolean>,
            "MUSIC"
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandQueue.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:06 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:31:43 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandQueue extends BaseCommand {
    public constructor() {
        super("queue", "See the current track list", new OptionMap<string, boolean>,
            "MUSIC"
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
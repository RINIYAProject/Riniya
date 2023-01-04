/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandAnnounce.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:00 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:40:01 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandAnnounce extends BaseCommand {
    public constructor() {
        super("announce", "Announce update", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isDeveloper", true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
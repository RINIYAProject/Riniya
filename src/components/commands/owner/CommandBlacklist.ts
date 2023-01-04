/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandBlacklist.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:44 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:39:45 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandBlacklist extends BaseCommand {
    public constructor() {
        super("blacklist", "Blacklist a user", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isDeveloper", true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
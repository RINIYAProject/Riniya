/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandCrate.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:41 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:41:42 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandCrate extends BaseCommand {
    public constructor() {
        super("crate", "Open a mystery box", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
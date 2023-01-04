/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandKiss.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:49 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:40:50 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandKiss extends BaseCommand {
    public constructor() {
        super("nkiss", "Kiss someone uwu", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
            .add("isNSFW", true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
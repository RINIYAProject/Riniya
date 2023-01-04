/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandEval.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:39:54 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:39:55 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandEval extends BaseCommand {
    public constructor() {
        super("eval", "Start a code evaluation", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isDeveloper", true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
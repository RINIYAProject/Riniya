/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandDog.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:24 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:41:25 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandDog extends BaseCommand {
    public constructor() {
        super("dog", "Random funny dog picture", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
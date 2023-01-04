/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandCuddles.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:56 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:40:57 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandCuddles extends BaseCommand {
    public constructor() {
        super("ncuddle", "Cuddle someone uwu", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
            .add("isNSFW", true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
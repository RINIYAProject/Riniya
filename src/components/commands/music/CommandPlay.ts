/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandPlay.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:02 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:41:03 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandPlay extends BaseCommand {
    public constructor() {
        super("play", "Play a music or resume the current track list", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
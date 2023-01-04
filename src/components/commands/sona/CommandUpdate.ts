/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandUpdate.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:34 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:40:35 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandUpdate extends BaseCommand {
    public constructor() {
        super("update", "Update your fursona information.", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
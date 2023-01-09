/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandSuck.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:47 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:04:33 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/components/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandSuck extends BaseCommand {
    public constructor() {
        super("nsuck", "Suck someone uwu", new OptionMap<string, boolean>()
            .add("isNSFW", true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
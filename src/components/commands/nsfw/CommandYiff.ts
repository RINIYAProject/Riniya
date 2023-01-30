/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandYiff.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:42 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:33:40 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";

import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandYiff extends BaseCommand {
    public constructor() {
        super("yiff", "Get random yiffy image", new OptionMap<string, boolean>()
            .add("isNSFW", true),
            "NSFW"
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandMeme.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:32 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:12:15 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";

import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandMeme extends BaseCommand {
    public constructor() {
        super("meme", "Random meme", new OptionMap<string, boolean>,
            "FUN"
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
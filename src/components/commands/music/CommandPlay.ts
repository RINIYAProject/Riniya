/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandPlay.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:02 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:04:40 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandPlay extends BaseCommand {
    public constructor() {
        super("play", "Play a music or resume the current track list");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandStop.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:08 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 01:55:48 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandStop extends BaseCommand {
    public constructor() {
        super("stop", "Stop the music.");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
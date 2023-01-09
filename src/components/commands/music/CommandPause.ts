/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandPause.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:00 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:04:37 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandPause extends BaseCommand {
    public constructor() {
        super("pause", "Pause the music");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
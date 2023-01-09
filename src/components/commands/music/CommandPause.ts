/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandPause.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:00 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:04:43 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/components/BaseCommand";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandPause extends BaseCommand {
    public constructor() {
        super("pause", "Pause the music");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
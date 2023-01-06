/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandWork.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:49 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 01:54:18 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandWork extends BaseCommand {
    public constructor() {
        super("work", "Start mining and get money");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
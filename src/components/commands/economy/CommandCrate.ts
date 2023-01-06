/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandCrate.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:41 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 01:53:54 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandCrate extends BaseCommand {
    public constructor() {
        super("crate", "Open a mystery box");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
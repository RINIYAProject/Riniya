/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandInventory.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:43 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 01:54:04 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandInventory extends BaseCommand {
    public constructor() {
        super("inventory", "Displaying your inventory.");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
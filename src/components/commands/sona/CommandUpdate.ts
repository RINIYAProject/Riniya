/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandUpdate.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:34 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:08:54 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import ModalHelper from "@riniya.ts/utils/ModalHelper";

import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandUpdate extends BaseCommand {
    public constructor() {
        super("update", "Update your fursona information.");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
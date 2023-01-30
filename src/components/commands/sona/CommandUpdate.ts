/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandUpdate.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:34 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 00:54:40 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";
import OptionMap from "@riniya.ts/utils/OptionMap";

import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandUpdate extends BaseCommand {
    public constructor() {
        super("update", "Update your fursona information.", new OptionMap<string, boolean>,
            "SONA"
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
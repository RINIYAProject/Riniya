/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandMeme.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:32 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:03:53 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "@riniya.ts/components/BaseCommand";

import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandMeme extends BaseCommand {
    public constructor() {
        super("meme", "Random meme");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
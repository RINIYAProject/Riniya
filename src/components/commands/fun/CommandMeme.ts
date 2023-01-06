/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandMeme.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:41:32 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 01:53:24 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandMeme extends BaseCommand {
    public constructor() {
        super("meme", "Random meme");
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   types.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:23:57 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 01:27:29 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Schema from "mongoose"
import Guild from "./database/Models/Guild/Guild"

export async function fetchGuild(guildId: string) {
    return await Guild.findOne({ guildId: guildId })
}
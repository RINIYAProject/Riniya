/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GuildAddEvent.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:41 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 06:22:42 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/BaseEvent";
import { registerCommands } from "../utils/registerCommand";
import { Guild } from "discord.js";

export default class GuildAddEvent extends BaseEvent {
    public constructor() {
        super("guildCreate", (guild: Guild) => {
            registerCommands(
                this.instance,
                guild.id,
                guild.name,
                this.instance.manager
            );
        });
    }
}
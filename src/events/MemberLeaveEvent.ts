/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MemberLeaveEvent.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:54 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 06:22:55 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/BaseEvent";
import { GuildMember } from "discord.js";

export default class MemberLeave extends BaseEvent {
    public constructor() {
        super("guildMemberLeave", (member: GuildMember) => {
            if (member.user.bot) return;
        });
    }
}
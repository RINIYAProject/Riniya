/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Member.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 23:27:55 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 23:33:55 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import mongoose from "mongoose";

export interface Member {
    memberId: string;
    guildId: string;
    username: string;
    identifier:number;
    avatar?: string;
    banner?: string;
    hexColor?: number;
}

export default mongoose.model<Member & mongoose.Document>("Member", new mongoose.Schema<Member & mongoose.Document>({
    memberId: { type: String, required: true },
    guildId: { type: String, required: true },
    username: { type: String, required: true },
    identifier: { type: Number, required: true },
    avatar: { type: String, default: "https://cdn.riniya.uk/images/avatar/default_avatar.webp" },
    banner: { type: String, default: "https://cdn.riniya.uk/images/avatar/default_banner.webp" },
    hexColor: { type: Number, default: 0xFFFF }
}));
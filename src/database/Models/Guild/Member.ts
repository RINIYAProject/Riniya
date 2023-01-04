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
}

export default mongoose.model<Member & mongoose.Document>("Member", new mongoose.Schema<Member & mongoose.Document>({
    memberId: { type: String },
    guildId: { type: String }
}));
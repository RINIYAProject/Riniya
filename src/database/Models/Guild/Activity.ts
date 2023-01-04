/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Activity.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 23:28:32 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 23:31:20 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import mongoose from "mongoose";

export interface Activity {
    guildId: string;
    memberId: string;
    type: string;
    action: string;
    registeredAt: number;
}

export default mongoose.model<Activity & mongoose.Document>("Activity", new mongoose.Schema<Activity & mongoose.Document>({
    guildId: { type: String },
    memberId: { type: String },
    type: { type: String },
    action: { type: String },
    registeredAt: { type: Number },
}));
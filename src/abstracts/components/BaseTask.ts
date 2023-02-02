/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseTask.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:23 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 19:35:07 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base from "../Base";
import cron from "node-cron"

export default abstract class BaseTask extends Base {

    public readonly task: cron.ScheduledTask;

    public constructor(name: string, label: string, time: string, listener: Function) {
        super(name, label, "TASK");

        this.task = cron.schedule(time, () => listener);
    }
}
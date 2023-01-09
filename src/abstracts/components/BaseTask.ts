/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseTask.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:23 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:28:29 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base from "../Base";
import cron from "node-cron"

export default abstract class BaseTask extends Base {

    public task: cron.ScheduledTask;

    public constructor(name: string, time: string, listener: Function) {
        super(name, "", "TASK");

        this.task = cron.schedule(time, () => listener);
    }
}
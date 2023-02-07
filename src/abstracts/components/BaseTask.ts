/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseTask.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:23 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/02/07 02:12:24 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base from "../Base";
import { CronJob } from "cron"

export default abstract class BaseTask extends Base {

    public readonly task: CronJob;

    public constructor(name: string, label: string, time: string, listener: Function) {
        super(name, label, "TASK");

        this.task = new CronJob(time, () => listener)
        this.task.start()
    }
}
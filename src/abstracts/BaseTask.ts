/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseTask.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:23 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 06:25:24 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Base, { BaseType } from "./Base";
import cron from "node-cron"

export default abstract class BaseTask extends Base {

    private task: cron.ScheduledTask;

    public constructor(name: string, time: string) {
        super(name, "", BaseType.TASK);

        this.task = cron.schedule(time, this.handler);
    }

    public abstract handler(): void;
    
    public cancel(): void {
        return this.task.stop();
    }
}
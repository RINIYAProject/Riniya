/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Logger.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:23:12 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 12:11:45 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import fs from "fs"
import moment from "moment";

export default class Logger {
    private prefix: string;
    private date: Date;

    public constructor(prefix: string) {
        this.prefix = prefix;
        this.date = new Date();
        fs.writeFile(`logs/Riniya-${this.date}.log`, "------------ STARTING LOGGING SESSION ------------\n", (err) => { });
    }

    public info(message: string) {
        this.log("info", message);
    }

    public warn(message: string) {
        this.log("warn", message);
    }

    public error(message: string) {
        this.log("error", message);
    }

    private log(type: string, message: string) {
        const prefix = `${moment(Date.now())} : ${this.prefix} . [${type}] - ${message}`;
        fs.appendFileSync(`logs/Riniya-${this.date}.log`, `${prefix}\n`);
        console.log(prefix);
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Logger.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:23:12 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 09:22:36 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import fs from "fs"

export default class Logger {
    private prefix: string;
    private date: Date;

    public constructor(prefix: string) {
        this.prefix = prefix;
        this.date = new Date();
        fs.writeFile(`logs/${prefix}-${this.date}.log`, "------------ STARTING LOGGING SESSION ------------", (err) => { });
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
        const prefix = `${new Date().toTimeString()} : ${this.prefix} . [${type}] - ${message}`;
        fs.appendFileSync(`logs/${this.prefix}-${this.date}.log`, `${prefix}\n`);
        console.log(prefix);
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   FileHelper.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/15 13:47:28 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/15 13:53:47 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import fs from "node:fs"
import Riniya from "@riniya.ts"
import Logger from "./Logger"

export default class FileHelper {
    private logger: Logger

    public constructor() {
        this.logger = Riniya.instance.logger
    }

    public search(path: string): string {
        this.logger.info("Reading path: " + path)
        return fs.readFileSync(path, 'utf-8')
    }
}
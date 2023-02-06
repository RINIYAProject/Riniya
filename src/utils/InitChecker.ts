/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   InitChecker.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/02/02 03:15:50 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/06 16:14:37 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from "@riniya.ts";

export default class InitChecker {
    public init(): boolean {
        if (this.unset("TOKEN"))
            return this.print("TOKEN")
        else if (this.unset("MONGODB"))
            return this.print("MONGODB")
        else if (this.unset("SERVER_KEY"))
            return this.print("SERVER_KEY")
        else if (this.unset("SERVER_CERT"))
            return this.print("SERVER_CERT")
        else if (this.unset("REDIS_PASSWORD"))
            return this.print("REDIS_PASSWORD")
        else if (this.unset("REDIS_URL"))
            return this.print("REDIS_URL")
        else if (this.unset("TWITTER_TOKEN"))
            return this.print("TWITTER_TOKEN")
        return false
    }

    private unset(key: string): boolean {
        return process.env[key] === undefined
    }

    private print(type: string): boolean {
        Riniya.instance.logger.error("-------------------------------------------")
        Riniya.instance.logger.error(" -> InitChecker failed at '" + type + "'.  ")
        Riniya.instance.logger.error("   -> Please check your environement file. ")
        Riniya.instance.logger.error("   -> Restart is required to continue.     ")
        Riniya.instance.logger.error("-------------------------------------------")
        return true;
    }
}
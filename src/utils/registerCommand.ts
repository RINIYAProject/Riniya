/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   registerCommand.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:23:18 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 06:23:19 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../abstracts/BaseCommand";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client } from "discord.js";
import CommandManager from "../components/commands/CommandManager";

export async function registerCommands(
    client: Client,
    guildId: string,
    guildName: string,
    commandManager: CommandManager) {
    try {
        const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

        const commandData = commandManager.toMap().map((getData: BaseCommand) => {
            return getData.getCommand().toJSON();
        });

        await rest.put(
            Routes.applicationGuildCommands(client.user?.id || "missing id", guildId),
            { body: commandData }
        );

    } catch (error) {
        if (error.rawError?.code === 50001) {
            console.log(`Missing Access on server "${guildName}"`)
            return
        }
        console.log(`Register command error on ${guildId}`)
        console.log(error)
    }
};
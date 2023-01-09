/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandManager.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:40:08 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:53:27 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Logger from "../../utils/Logger";
import BaseCommand from "../../abstracts/components/BaseCommand";
import OptionMap from "../../utils/OptionMap";
import { Collection } from "discord.js";

import CommandBan from "./administrator/CommandBan";
import CommandKick from "./administrator/CommandKick";
import CommandMute from "./administrator/CommandMute";
import CommandWarn from "./administrator/CommandWarn";

import CommandBalance from "./economy/CommandBalance";
import CommandInventory from "./economy/CommandInventory";
import CommandWork from "./economy/CommandWork";

import CommandFox from "./fun/CommandFox";
import CommandCat from "./fun/CommandCat";
import CommandDog from "./fun/CommandDog";
import CommandMeme from "./fun/CommandMeme";

import CommandLeaderboard from "./level/CommandLeaderboard";
import CommandProfile from "./level/CommandProfile";
import CommandRewards from "./level/CommandRewards";

import CommandAbout from "./misc/CommandAbout";
import CommandHelp from "./misc/CommandHelp";
import CommandPing from "./misc/CommandPing";

import CommandPause from "./music/CommandPause";
import CommandPlay from "./music/CommandPlay";
import CommandQueue from "./music/CommandQueue";
import CommandStop from "./music/CommandStop";

import CommandCuddles from "./nsfw/CommandCuddles";
import CommandE621 from "./nsfw/CommandE621";
import CommandFuck from "./nsfw/CommandFuck";
import CommandKiss from "./nsfw/CommandKiss";
import CommandSuck from "./nsfw/CommandSuck";
import CommandYiff from "./nsfw/CommandYiff";

import CommandAnnounce from "./owner/CommandAnnounce";
import CommandBlacklist from "./owner/CommandBlacklist";
import CommandDeveloper from "./owner/CommandDeveloper";
import CommandEval from "./owner/CommandEval";
import CommandReload from "./owner/CommandReload";

import CommandCreate from "./sona/CommandCreate";
import CommandShow from "./sona/CommandShow";
import CommandUpdate from "./sona/CommandUpdate";
import CommandSpawnButton from "./owner/CommandSpawnButton";
import CommandDonate from "./misc/CommandDonate";
import { removeApplicationCommands } from "../../utils/registerCommand";
import CommandRole from "./administrator/CommandRole";

export default class CommandManager {
    private REGISTRY: OptionMap<String, BaseCommand>;
    private logger: Logger;

    public constructor() {
        this.REGISTRY = new OptionMap<String, BaseCommand>();
        this.logger = new Logger("CommandRegistry");
    }

    public registerCommand(base: BaseCommand): void {
        if (this.REGISTRY.getMap().has(base.name)) {
            throw new Error("You can't register the same command at once.");
        }
        if (base.options.get("isDisabled")) {
            this.logger.warn(`${base.name} is disabled.`);
        } else {
            this.REGISTRY.add(base.name, base);
            this.logger.info(`Command ${base.name} is now registered.`);
        }
    }

    public registerCommands(): void {
        this.registerCommand(new CommandBan());
        this.registerCommand(new CommandKick());
        this.registerCommand(new CommandMute());
        this.registerCommand(new CommandWarn());
        this.registerCommand(new CommandRole());

        /////////////

        this.registerCommand(new CommandBalance());
        this.registerCommand(new CommandInventory());
        this.registerCommand(new CommandWork());

        /////////////

        this.registerCommand(new CommandFox());
        this.registerCommand(new CommandCat());
        this.registerCommand(new CommandDog());
        this.registerCommand(new CommandMeme());

        /////////////

        this.registerCommand(new CommandLeaderboard());
        this.registerCommand(new CommandProfile());
        this.registerCommand(new CommandRewards());

        /////////////

        this.registerCommand(new CommandAbout());
        this.registerCommand(new CommandHelp());
        this.registerCommand(new CommandPing());
        this.registerCommand(new CommandDonate());

        /////////////

        this.registerCommand(new CommandPause());
        this.registerCommand(new CommandPlay());
        this.registerCommand(new CommandQueue());
        this.registerCommand(new CommandStop());

        /////////////

        this.registerCommand(new CommandCuddles());
        this.registerCommand(new CommandE621());
        this.registerCommand(new CommandFuck());
        this.registerCommand(new CommandKiss());
        this.registerCommand(new CommandSuck());
        this.registerCommand(new CommandYiff());

        /////////////

        this.registerCommand(new CommandAnnounce());
        this.registerCommand(new CommandBlacklist());
        this.registerCommand(new CommandDeveloper());
        this.registerCommand(new CommandEval());
        this.registerCommand(new CommandReload());
        this.registerCommand(new CommandSpawnButton())

        /////////////

        this.registerCommand(new CommandCreate());
        this.registerCommand(new CommandShow());
        this.registerCommand(new CommandUpdate());
    }

    public getCommand(name: string): BaseCommand {
        return this.REGISTRY.get(name);
    }

    public removeCommand(name: string): Boolean {
        this.logger.warn(`The handler of ${name} is now deleted.`);
        return this.REGISTRY.remove(name);
    }

    public reload() {
        this.REGISTRY.getMap().clear();
        removeApplicationCommands();
        this.registerCommands();
    }

    public toMap(): Collection<String, BaseCommand> {
        return this.REGISTRY.getMap();
    }
}
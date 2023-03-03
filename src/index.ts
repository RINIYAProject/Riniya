/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 11:52:16 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/11 01:49:08 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import * as dotenv from "dotenv";

dotenv.config()

import 'module-alias/register';
import { Client, Intents } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import mongoose from "mongoose";
import Logger from "@riniya.ts/logger";
import CommandManager from "./components/commands/CommandManager";
import EventManager from "./events/EventManager";
import ButtonManager from "./components/buttons/ButtonManager";
import ModalManager from "./components/modals/ModalManager";
import discordModals from "discord-modals";
import ServerManager from "./api/index";

import DiscordXp from "discord-xp";
import TasksManager from './components/tasks/TasksManager';
import InitChecker from './utils/InitChecker';
import VerificationManager from "./database/VerificationManager";

export default class Riniya extends Client {
    public static instance: Riniya

    public database: mongoose.Mongoose

    public readonly REGISTRY: SlashCommandBuilder
    public readonly logger: Logger
    public readonly checker: InitChecker

    public manager: CommandManager
    public eventManager: EventManager
    public buttonManager: ButtonManager
    public modalManager: ModalManager
    public serverManager: ServerManager
    public taskManager: TasksManager
    public discordXp: DiscordXp
    public loaded: boolean = false
    public verification: VerificationManager

    public readonly version: string = process.env.VERSION || "Unreferenced version."
    public readonly revision: string = process.env.REVISION || "Unreferenced revision code."

    public constructor() {
        super({
            partials: ["MESSAGE", "USER", "REACTION"],
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_INTEGRATIONS,
                Intents.FLAGS.GUILD_WEBHOOKS,
                Intents.FLAGS.GUILD_INVITES,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_PRESENCES,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_MESSAGE_TYPING,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            ],
            ws: { properties: { $browser: "Discord iOS" } }
        })
        Riniya.instance = this
        this.logger = new Logger("Riniya")
        this.checker = new InitChecker()

        process.on('uncaughtException', function (error) {
            Riniya.instance.logger.error("Stacktrace: " + error.stack)
            Riniya.instance.logger.error("\n");
        });

        process.on('unhandledRejection', function (error) {
            Riniya.instance.logger.error("Stacktrace: " + error)
            Riniya.instance.logger.error("\n")
        })

        if (this.checker.init())
            this.logger.error('  -> Process aborted.')
        else
            this.start()
    }

    private start() {
        this.logger.info("Loading system...")
        this.logger.info(`Version: ${this.version}`)
        this.logger.info(`Revision: ${this.revision}`)

        discordModals(this);

        this.logger.info("Connecting to MongoDB")
        mongoose.connect(process.env.MONGODB, {}).then(db => {
            this.database = db;
            this.logger.info("Connected to MongoDB.")
        }).catch(err => {
            this.logger.warn("Failed to contact the database.")
        });

        this.load()
    }

    private load() {
        this.logger.info("Loading commands.")

        this.manager = new CommandManager()
        this.manager.registerCommands()

        this.eventManager = new EventManager()
        this.eventManager.registerEvents()

        this.buttonManager = new ButtonManager()
        this.buttonManager.registerButtons()

        this.modalManager = new ModalManager()
        this.modalManager.registerModals()

        this.serverManager = new ServerManager()
        this.serverManager.registerServers()
        this.serverManager.initServers()

        this.taskManager = new TasksManager();
        this.taskManager.registerAll();

        this.verification = new VerificationManager()

        this.login(process.env.TOKEN)
    }

    public reload() {
        this.logger.info("Realoding components...")
        this.manager.reload()
        this.buttonManager.reload()
        this.modalManager.reload()
    }

    public static getInstance(): Riniya {
        return this.instance
    }
}

export const riniya: Riniya = new Riniya()
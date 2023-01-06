/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:23:24 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 07:35:13 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Client, Intents } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import mongoose from "mongoose"

import Logger from "./utils/Logger"
import CommandManager from "./components/commands/CommandManager"
import EventManager from "./events/EventManager"
import ButtonManager from "./components/buttons/ButtonManager"
import ModalManager from "./components/modals/ModalManager"
import discordModals from "discord-modals"
import WebsocketServer from "./websocket/index"

export default class Ghidorah extends Client {
    public static instance: Ghidorah

    public database: mongoose.Mongoose;

    public REGISTRY: SlashCommandBuilder
    public logger: Logger

    public manager: CommandManager
    public eventManager: EventManager
    public buttonManager: ButtonManager
    public modalManager: ModalManager
    public loaded: boolean = false

    public websocket: WebsocketServer

    public version: string = "7.2.8"
    public revision: string = "0F 2B A1"

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
        });
        Ghidorah.instance = this;

        this.start();
    }

    private start() {
        this.logger = new Logger("Riniya");
        this.logger.info("Loading system...");
        this.logger.info(`Version: ${this.version}`);
        this.logger.info(`Revision: ${this.revision}`);

        discordModals(this);

        this.logger.info("Connecting to MongoDB");
        mongoose.connect(process.env.MONGODB, {}).then(db => {
            this.database = db;
            this.logger.info("Connected to MongoDB.");
        }).catch(err => {
            this.logger.warn("Failed to contact the database.");
        });

        this.load();
    }

    private load() {
        this.logger.info("Loading commands.");

        this.manager = new CommandManager();
        this.manager.registerCommands();

        this.eventManager = new EventManager();
        this.eventManager.registerEvents();

        this.buttonManager = new ButtonManager();
        this.buttonManager.registerButtons();

        this.modalManager = new ModalManager();
        this.modalManager.registerModals();

        this.websocket = new WebsocketServer();
        this.websocket.load();

        this.login(process.env.TOKEN);
    }

    public reload() {
        this.logger.info("Realoding components...");
        this.manager.reload();
        this.buttonManager.reload();
        this.modalManager.reload();
    }

    public static getInstance(): Ghidorah {
        return this.instance;
    }
}

export const client: Ghidorah = new Ghidorah();
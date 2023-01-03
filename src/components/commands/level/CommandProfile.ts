import { SlashCommandUserOption } from "@discordjs/builders";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 

export default class CommandProfile extends BaseCommand {
    public constructor() {
        super("profile", "Showing a user profile.", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
        );

        this.addUserOption(
            new SlashCommandUserOption()
                .setName("user")
                .setDescription("Select a user")
                .setRequired(false)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
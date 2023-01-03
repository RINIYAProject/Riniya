import { SlashCommandUserOption } from "@discordjs/builders";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 

export default class CommandFuck extends BaseCommand {
    public constructor() {
        super("fuck", "Fuck someone", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
            .add("isNSFW", true)
        );

        this.addUserOption(
            new SlashCommandUserOption()
                .setName("target")
                .setDescription("Select the person you want to fuck")
                .setRequired(true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
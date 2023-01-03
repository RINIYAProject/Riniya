import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap";
import { SlashCommandNumberOption } from "@discordjs/builders";
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandSell extends BaseCommand {
    public constructor() {
        super("sell", "Sell one of your item", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
        );

        this.addNumberOption(
            new SlashCommandNumberOption()
                .setName("itemid")
                .setDescription("Please set the ItemID to sell.")
                .setRequired(true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
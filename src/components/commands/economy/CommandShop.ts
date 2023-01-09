import { SlashCommandIntegerOption, SlashCommandStringOption, SlashCommandSubcommandBuilder } from "@discordjs/builders";
import BaseCommand from "abstracts/components/BaseCommand";
import { CommandInteraction, CacheType, GuildMember, Guild } from "discord.js";

export default class CommandShop extends BaseCommand {

    public constructor() {
        super("shop", "Access to the shop.");

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("buy")
                .setDescription("Buy a item.")
                .addStringOption(
                    new SlashCommandStringOption()
                        .setName("item")
                        .setDescription("Please enter the item name.")
                        .setRequired(true)
                )
                .addIntegerOption(
                    new SlashCommandIntegerOption()
                        .setName("quantity")
                        .setDescription("Please enter the quantity you want")
                )
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("sell")
                .setDescription("Sell a item.")
                .addStringOption(
                    new SlashCommandStringOption()
                        .setName("item")
                        .setDescription("Please enter the item name.")
                        .setRequired(true)
                )
                .addIntegerOption(
                    new SlashCommandIntegerOption()
                        .setName("quantity")
                        .setDescription("Please enter the quantity you want")
                )
        );

        this.addSubCommand(
            new SlashCommandSubcommandBuilder()
                .setName("action")
                .setDescription("View the action shop.")
        );
    }

    public handler(inter: CommandInteraction<"cached">, member: GuildMember, guild: Guild): void {
        
    }
}
import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap"; 
import { GuildMember, Guild, CommandInteraction } from "discord.js";

export default class CommandDeveloper extends BaseCommand {
    public constructor() {
        super("developer", "Add a developer access", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isDeveloper", true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) { }
}
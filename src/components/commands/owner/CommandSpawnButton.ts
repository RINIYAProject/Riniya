import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap";
import { GuildMember, Guild, CommandInteraction, } from "discord.js";
import { SlashCommandStringOption } from "@discordjs/builders";
import BaseButton from "../../../abstracts/BaseButton";

export default class CommandSpawnButton extends BaseCommand {
    public constructor() {
        super("spawn", "Summoning a button.", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", true)
        );

        this.addStringOption(
            new SlashCommandStringOption()
                .setName("buttonid")
                .setDescription("Select the button")
                .setRequired(true)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        const buttonId: string = inter.options.getString("buttonid") || null;
        const handler: BaseButton = this.instance.buttonManager.getButton(buttonId);

        if (!handler) {
            inter.followUp({
                content: 'Failed to summon ' + buttonId,
                ephemeral: true
            });
        } else {
            inter.reply({
                "components": [
                    {
                        "type": 1,
                        "components": [handler.generate()]
                    }
                ],
                ephemeral: true
            });
        }
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AcceptRules.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:24:12 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 08:11:44 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import OptionMap from "@riniya.ts/utils/OptionMap";
import {
    ButtonInteraction,
    MessageButton,
    MessageEmbed,
    Role
} from "discord.js";
import BaseButton from "@riniya.ts/components/BaseButton";
import GuildModel from "@riniya.ts/database/Guild/Guild"

export default class AcceptRules extends BaseButton<MessageButton, void> {

    public constructor() {
        super(
            "row_agree",
            "Accept",
            new OptionMap<string, unknown>()
        );
    }

    public async handler(interaction: ButtonInteraction<"cached">): Promise<void> {
        const guild = await GuildModel.findOne({ guildId: interaction.guild.id });
        if (guild.roleEnabled) {
            const ruleRole: Role = interaction.guild.roles.cache.get(guild.roleRule);
            if (interaction.member.roles.cache.has(ruleRole.id)) {
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("Riniya - Error")
                            .setDescription("You already agreed with our rules.")
                            .setColor("#36393f")
                    ],
                    ephemeral: true
                });
            } else {
                interaction.member.roles.add(ruleRole);
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("Riniya - Rules")
                            .setDescription("You agreed with our rules.")
                            .setColor("#36393f")
                    ],
                    ephemeral: true
                });
            }
        } else {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Riniya - Error")
                        .setDescription("This server is not configurated.")
                        .setColor("#36393f")
                ],
                ephemeral: true
            });
        }
    }

    public generate(): MessageButton {
        return new MessageButton()
            .setCustomId(this.customId)
            .setLabel(this.description)
            .setStyle("SECONDARY")
            .setEmoji("<:CatLurkHi:783810410997481512>")
            .setDisabled(false);
    }

    public message(): MessageEmbed {
        return new MessageEmbed({
            "type": "rich",
            "title": `Rules`,
            "description": `\n1) Respect all members: Racism or other forms of degrading content is not acceptable here, and will be penalised based on the severity of the offence. Teasing and banter is welcome, but only within the bounds of what is acceptable to the target. Debate is permitted, arguments are not. Do Not steal or try to steal the photos / art shared here. \n\n2) Talk in the right place: The server has channels for plenty of things. Be sure to use them how they're meant to be used. It's not a big deal if you make a mistake and go off track or accidentally send the message in the wrong channel, but don't argue or complain when staff reminds you to move. The Media channels are strictly for Social Medias & similar, Please do not Advertise any Discord servers in those channels.\n\n3) Nothing Explicit: No NSFW images or Media in the Main portions of the server. If you want to gain access to the NSFW channel, then contact an Admin and provide proper ID to get the role.  Messages containing detailed descriptions of sexual or violent scenarios will also be penalised based on the circumstance and severity. No matter where in the server, No profile pictures or banners containing NSFW\n\n4) Respect Staff and their decisions: Staff decisions should not be argued with. If a staff member makes a decision you do not approve of, contact an admin or the owner; an admin or owner's verdict is final.\n5) Complaints & Appeals: If you find a member breaking a rule, report it to one of the mods. Do not create, or get involved in discussion relating to staff decisions. If you wish to make an appeal, DM an admin or another mod.\n\n6) Use your head: Common sense is a lovely thing - apply it when you're here. Not everything can be mentioned in the rules, and we expect you to understand that; if you are warned not to do something, even if it isn't mentioned in the rules, accept it and move on. Loopholes aren't an exception either, if you find a loophole in a rule, we don't care and will punish you just the same. Advertising of Discord servers & Unwanted services is not allowed, if you do it your message will be deleted and you will be warned. \n\n7) Stay on topic: When someone is talking about something, try and stay on that topic with them. It's not something we can enforce much, but it's courtesy. Don't barge in a serious conversation talking about sheep; your topic will have its time.\n\n8) And Of course... Have Fun, this server is meant to be a home for Furries and everyone else, a calm, accepting and nurturing community. Enjoy it!\n`,
            "color": 0x36393f
        });
    }
}
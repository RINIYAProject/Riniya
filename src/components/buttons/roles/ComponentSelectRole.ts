import BaseComponent from "../../../abstracts/components/BaseComponent";
import Role from "../../../database/Models/Guild/Role";
import { SelectMenuInteraction } from "discord.js";

export default class ComponentSelectRole extends BaseComponent<SelectMenuInteraction<"cached">, void> {

    public constructor() {
        super("row_role_select");
    }

    public async handler(interaction: SelectMenuInteraction<"cached">): Promise<void> {
        const selfRoleDocuments = await Role.find({
            guildId: interaction.guild.id,
            selfAssignable: true
        });

        const memberRoles = interaction.member.roles.cache
            .filter(r => !selfRoleDocuments.some(doc => doc.id === r.id))
            .map(r => r.id)
            .concat(interaction.values.filter(id => selfRoleDocuments.some(doc => doc.id === id)));
        
        await interaction.member.roles.set(memberRoles);
        await interaction.deferUpdate();
    }
}
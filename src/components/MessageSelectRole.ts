/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MessageSelectRole.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 16:46:23 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/29 16:46:24 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { BaseMessageComponent, MessageComponentType } from "discord.js";

export class MessageSelectRole extends BaseMessageComponent {
    public constructor(data?: MessageSelectRole) {
        super(data)
    }
    public customId: string | null;
    public disabled: boolean;
    public maxValues: number | null;
    public minValues: number | null;
    public placeholder: string | null;
    public type: MessageComponentType;

    public setCustomId(customId: string): MessageSelectRole {
        this.customId = customId;
        return this;
    }

    public setDisabled(disabled: boolean): MessageSelectRole {
        this.disabled = disabled;
        return this;
    }

    public setMinValues(min: number): MessageSelectRole {
        this.minValues = min;
        return this;
    }

    public setMaxValues(max: number): MessageSelectRole {
        this.maxValues = max;
        return this;
    }

    public setPlaceholder(placeholder?: string): MessageSelectRole {
        this.placeholder = placeholder || "";
        return this;
    }

    public setType(key: MessageComponentType): MessageSelectRole {
        this.type = key;
        return this;
    }
}
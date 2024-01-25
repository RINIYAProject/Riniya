/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Base.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:00 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/30 19:34:11 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import OptionMap from "@riniya.ts/utils/OptionMap";
import Logger from "@riniya.ts/logger";
import Riniya from "@riniya.ts";

export declare type ComponentType = 'BUTTON' | 'COMMAND' | 'MODAL' | 'TASK' | 'EVENT' | 'COMPONENT' | 'SERVER' | 'UNRELATED';

export default abstract class Base {
    public readonly instance: Riniya = Riniya.instance;
    public readonly name: string;
    public readonly description: string;
    public readonly type: ComponentType;
    public options?: OptionMap<string, boolean>;

    protected constructor(name: string,
        description?: string,
        type?: ComponentType) {
        this.name = name;
        this.description = description || "No description.";
        this.type = type || "UNRELATED";
    }

    protected setOptions(options: OptionMap<string, boolean>): void {
        this.options = options;
    }

    protected getHandle(): Riniya {
        return Riniya.instance;
    }

    protected getLogger(): Logger {
        return this.getHandle().logger;
    }
}

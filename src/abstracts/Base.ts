/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Base.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:00 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 01:17:59 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Logger from "../utils/Logger";
import Ghidorah from "../index"
import OptionMap from "../utils/OptionMap";

export default abstract class Base {
    public instance: Ghidorah = Ghidorah.instance;
    public name: string;
    public description: string;
    public type: BaseType;
    public options?: OptionMap<string, boolean>;

    public constructor(name: string,
        description: string,
        type: BaseType) {
        this.name = name;
        this.description = description;
        this.type = type;
    }

    protected setOptions(options: OptionMap<string, boolean>): void {
        this.options = options;
    }

    protected getHandle(): Ghidorah {
        return Ghidorah.instance;
    }

    protected getLogger(): Logger {
        return this.getHandle().logger;
    }
}

export enum BaseType {
    BUTTON,
    COMMAND,
    MODAL,
    TASK,
    EVENT,
    COMPONENT,
    SERVER
}
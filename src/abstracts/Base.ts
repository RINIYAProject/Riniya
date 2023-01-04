/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Base.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:25:00 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 00:23:43 by NebraskyThe      ###   ########.fr       */
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
    public options: OptionMap<string, boolean>;
    public permissions: Array<any>;

    public constructor(name: string,
        description: string,
        type: BaseType) {
        this.name = name;
        this.description = description;
        this.type = type;
    }

    abstract execute(): void;

    protected setOptions(options: OptionMap<string, boolean>): void {
        this.options = options;
    }

    protected setPermissions(permissions: Array<any>): void {
        this.permissions = permissions;
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
    EVENT
}
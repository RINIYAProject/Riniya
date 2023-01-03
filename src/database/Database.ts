/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Database.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:21:52 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 08:20:58 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import OptionMap from "../utils/OptionMap";
import BaseModel from "./BaseModel";
import Guild from "./Models/Guild/Guild";

export default class Database {

    private models: OptionMap<String, BaseModel<unknown, unknown>>;

    public constructor () {
        this.models = new OptionMap<String, BaseModel<unknown, unknown>>();
    }
    
    public query(model: string): BaseModel<unknown, unknown> {
        return this.models.get(model);
    }

    public registerModels() {
        this.registerModel(new Guild());
    }

    private registerModel(model: BaseModel<unknown, unknown>): void {
        this.models.add(model.customId, model);
    }
}
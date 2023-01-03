/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseModel.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:15 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 08:50:02 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Snowflake } from "discord.js";
import Ghidorah from "../index";
import mongoose, { Callback, ObjectId, Query, Schema } from "mongoose";
import OptionMap from "../utils/OptionMap";

export default abstract class BaseModel<T, V> extends Query<T, V> {
    private cache: OptionMap<Snowflake, OptionMap<ObjectId, Document>>;
    private instance: Ghidorah;

    public customId: string;

    public constructor(
        customId: string
    ) {
        super();

        this.cache = new OptionMap<Snowflake, OptionMap<ObjectId, Document>>();
        this.instance = Ghidorah.instance;
        this.customId = customId;

        this.model = mongoose.model(this.customId, this.schematic());
    }

    override find(filter: mongoose.FilterQuery<V>, projection?: mongoose.ProjectionType<V>, options?: mongoose.QueryOptions<V>, callback?: mongoose.Callback<V[]>): mongoose.Query<V[], V, {}, V>;
    override find(filter: mongoose.FilterQuery<V>, projection?: mongoose.ProjectionType<V>, callback?: mongoose.Callback<V[]>): mongoose.Query<V[], V, {}, V>;
    override find(filter: mongoose.FilterQuery<V>, callback?: mongoose.Callback<V[]>): mongoose.Query<T, V>;
    override find(callback?: mongoose.Callback<V[]>): mongoose.Query<V[], V, {}, V>;
    override find(filter?: unknown, projection?: unknown, options?: unknown, callback?: Callback<V[]>): mongoose.Query<any, any> {
        return this.model.find(filter, projection, options, callback);
    }

    override findOne(filter?: mongoose.FilterQuery<V>, projection?: mongoose.ProjectionType<V>, options?: mongoose.QueryOptions<V>, callback?: mongoose.Callback<V>): mongoose.Query<V, V, {}, V>;
    override findOne(filter?: mongoose.FilterQuery<V>, projection?: mongoose.ProjectionType<V>, callback?: mongoose.Callback<V>): mongoose.Query<V, V, {}, V>;
    override findOne(filter?: mongoose.FilterQuery<V>, callback?: mongoose.Callback<V>): mongoose.Query<V, V, {}, V>;
    override findOne(filter?: unknown, projection?: unknown, options?: unknown, callback?: Callback<V>): mongoose.Query<V, V, {}, V> {
        return this.model.findOne(filter, projection, options, callback);
    }

    override findById(id: any, projection?: mongoose.ProjectionType<V>, options?: mongoose.QueryOptions<V>, callback?: mongoose.Callback<V>): mongoose.Query<V, V, {}, V>;
    override findById(id: any, projection?: mongoose.ProjectionType<V>, callback?: mongoose.Callback<V>): mongoose.Query<V, V, {}, V>;
    override findById(id: any, callback?: mongoose.Callback<V>): mongoose.Query<V, V, {}, V>;
    override findById(id: unknown, projection?: unknown, options?: unknown, callback?: Callback<V>): mongoose.Query<V, V, {}, V> {
        return this.model.findById(id, projection, options, callback);
    }

    public abstract schematic(): Schema;
}
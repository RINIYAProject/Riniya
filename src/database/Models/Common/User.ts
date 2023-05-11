/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   User.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 22:25:34 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 01:31:20 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import mongoose from "mongoose";

export declare type Achievements = {
    id: string;
    name: string;
    value: string;
}

export declare enum Rarity {
    COMMON = "Common",
    UNCOMMON = "Uncommon",
    RARE = "Rare",
    EPIC = "Epic",
    LEGENDARY = "Legendary",
    MYSTIC = "Mystic"
}

export declare type Effect = {
    id: number;
    name: string;
    icon: string;
    duration: number;
    level: number;
}

export declare type ToolData = {
    resistance: number;
    damages: number;
    effect: Effect;
}

export declare type Item = {
    id: number;
    name: string;
    unlocalizedName: string;
    icon: string;
    stackable: boolean;
    rarity: Rarity;
}

export declare type Crate = {
    id: string;
    name: string;
    crateHash: string;
    rarity: Rarity;
}

export declare type Armor = {
    id: string;
    name: string;
    metadata: ToolData;
    rarity: Rarity;
}

export declare type Weapons = {
    id: string;
    name: string;
    type: string;
    metadata: ToolData;
    rarity: Rarity;
}

export declare enum SpellType {
    HEALING,
    ATTACK,
    BUILD
}

export declare type Spell = {
    id: string;
    name: string;
    type: SpellType;
    metadata: ToolData;
    rarity: Rarity;
}

export declare type Runes = {
    id: string;
    name: string;
    rarity: Rarity;
}

export declare type Inventory = {
    slots: number;
    items?: Item[];
    crates?: Crate[];
    armors?: Armor[];
    weapons?: Weapons[];
    spells?: Spell[];
    runes?: Runes[];
    gold: number;
    power: number;
}

export declare enum CharacterSpeciality {
    HUNTER,
    MURDERER,
    MAGE,
    UNDEAD
}

export declare enum CharacterSpecies {
    ELF,
    FOX,
    WOLF,
    DRAGON
}

export declare type Character = {
    id: string;
    name: string;
    speciality: CharacterSpeciality;
    species: CharacterSpecies;
}[]

export declare type Bank = {
    gold: number;
    shop: number;
    medals: number;
    ticket: number;
}

export declare type Clan = {
    id: number;
    name: string;
    description: string;
}

export declare type Player = {
    achievements?: Achievements[];
    inventory: Inventory;
    chracter?: Character;
    bank?: Bank;
    clan?: Clan;
}

export declare type Economy = {
    reputation: number;
    berries: number;
    money: number;
    gold: number;
}

export declare type Level = {
    level: number;
    experience: number;
}

export declare type Child = {
    id: number;
    name: string;
    last: string;
    age: number;
}

export declare type Spouse = {
    userId: string;
    childs?: Child[];
}

export interface IUser {
    userId: string;
    player: Player;
    economy: Economy;
    level: Level;
    spouse: Spouse;
}

export default mongoose.model<IUser & mongoose.Document>("DiscordUser", new mongoose.Schema<IUser & mongoose.Document>({
    userId: { type: String, unique: true },
    player: { type: Object },
    economy: { type: Object },
    level: { type: Object },
    spouse: { type: Object }
}));

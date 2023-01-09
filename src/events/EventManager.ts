/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   EventManager.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 06:22:37 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:29:02 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseEvent from "../abstracts/components/BaseEvent";
import Logger from "../utils/Logger";
import OptionMap from "../utils/OptionMap";

import DisconnectEvent from "./DisconnectEvent";
import ErrorEvent from "./ErrorEvent";
import GuildAddEvent from "./GuildAddEvent";
import GuildDeleteEvent from "./GuildDeleteEvent";
import InteractionEvent from "./InteractionEvent";
import MemberJoin from "./MemberJoinEvent";
import MemberLeave from "./MemberLeaveEvent";
import MessageEvent from "./MessageEvent";
import ModalSubmit from "./ModalSubmitEvent";
import Ready from "./ReadyEvent";

export default class EventManager {
    private REGISTRY: OptionMap<String, BaseEvent>;
    private logger: Logger;

    public constructor() {
        this.REGISTRY = new OptionMap<String, BaseEvent>;
        this.logger = new Logger("EventRegistry");
    }

    public registerEvents(): void {
        this.registerEvent(new DisconnectEvent());
        this.registerEvent(new ErrorEvent());
        this.registerEvent(new GuildAddEvent());
        this.registerEvent(new GuildDeleteEvent())
        this.registerEvent(new InteractionEvent());
        this.registerEvent(new MemberJoin());
        this.registerEvent(new MemberLeave());
        this.registerEvent(new MessageEvent());
        this.registerEvent(new ModalSubmit());
        this.registerEvent(new Ready());
    }

    private registerEvent(base: BaseEvent): void {
        this.REGISTRY.add(base.name, base);
        this.logger.info(`Event ${base.name} is now registered.`);
    }

    public getEvent(key: String): BaseEvent {
        return this.REGISTRY.get(key);
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   guild-routes.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 13:56:19 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/15 16:52:06 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import AbstractRoutes from "../../Server/AbstractRoutes";
import Riniya from "@riniya.ts";
import Message from "@riniya.ts/database/Common/Message";
import Verification from "@riniya.ts/database/Guild/Verification";
import Sanction from "@riniya.ts/database/Moderation/Sanction";
import Activity from "@riniya.ts/database/Guild/Activity";
import { isNull } from "@riniya.ts/types";

export declare type Activity = {
    guildId: string;
    memberId: string;
    type: string;
    action: string;
    registeredAt: number;
}

export declare type ActivityModel = {
    status: boolean;
    data?: Activity;
}

export default class GuildRoutes extends AbstractRoutes {
    public register() {
        this.router.get('/servers', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            if (isNull(Riniya.instance.guilds))
                return res.status(404).json({
                    status: false,
                    error: "No servers has been found in the database."
                }).end()
            return res.status(200).json({
                status: true,
                data: Riniya.instance.guilds.cache.values()
            }).end()
        })

        this.router.get('/servers/:guildId', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            if (isNull(req.params.guildId))
                return res.status(403).json({
                    status: false,
                    error: `You must specify the 'server_id' first.`
                }).end()


            const server = Riniya.instance.guilds.cache.get(req.params.guildId)

            if (isNull(server))
                return res.status(403).json({
                    status: false,
                    error: `The server is not found.`
                }).end()

            return res.status(200).json({
                status: true,
                data: server
            }).end()
        })

        this.router.get('/servers/:guildId/members', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            if (isNull(req.params.guildId))
                return res.status(403).json({
                    status: false,
                    error: `You must specify the 'server_id' first.`
                }).end()

            const members = this.instance.guilds.cache.get(req.params.guildId).members.cache.values()

            if (isNull(members))
                return res.status(403).json({
                    status: false,
                    error: `The member list is unavailable or the server is not existing.`
                }).end()

            return res.status(200).json({
                status: true,
                data: members
            }).end()
        })

        this.router.get('/servers/:guildId/members/:memberId', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            if (isNull(req.params.guildId) || isNull(req.params.memberId))
                return res.status(403).json({
                    status: false,
                    error: `The 'member_id' or 'guild_id' is not valid.`
                }).end()

            const member = this.instance.guilds.cache.get(req.params.guildId).members.cache.get(req.params.memberId)

            if (isNull(member)) 
                return res.status(403).json({
                    status: false,
                    error: `The member is not in the database.`
                }).end()

            return res.status(200).json({
                status: true,
                data: member
            }).end()
        })

        // TODO: Later usage
        // -> -> -> -> -> -> -> ->
        // Level system for servers
        // Member profile 
        //
        // this.router.get('/servers/:guildId/members/:memberId/level', async (req, res) => { })
        // this.router.get('/servers/:guildId/members/:memberId/profile', async (req, res) => { })

        this.router.get('/servers/:guildId/members/:memberId/sanctions', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            if (isNull(req.params.guildId) || isNull(req.params.memberId))
                return res.status(403).json({
                    status: false,
                    error: `The 'member_id' or 'guild_id' is not valid.`
                }).end()

            const sanctions = await Sanction.find({
                guildId: req.params.guildId,
                memberId: req.params.memberId
            })

            if (isNull(sanctions))
                return res.status(403).json({
                    status: false,
                    error: `This member does not have any sanction in this server.`
                }).end()
            
            return res.status(200).json({
                status: true,
                data: sanctions
            }).end()
        })

        this.router.get('/servers/:guildId/verifications', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            if (req.params.guildId === undefined)
                return res.status(403).json({
                    status: false,
                    error: `You should specify the 'server_id' first.`
                }).end()

            const verifications = await Verification.find({
                guildId: req.params.guildId
            })

            if (isNull(verifications))
                return res.status(403).json({
                    status: false,
                    error: `This server does not have any verifications.`
                }).end()
            
            return res.status(200).json({
                status: true,
                data: verifications
            }).end()
        })

        this.router.get('/servers/:guildId/verifications/:userId', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            if (req.params.guildId === undefined || req.params.userId === undefined)
                return res.status(403).json({
                    status: false,
                    error: `You should specify the 'server_id' and 'member_id' first.`
                }).end()

            const verifications = await Verification.findOne({
                guildId: req.params.guildId,
                memberId: req.params.userId
            })

            if (isNull(verifications))
                return res.status(403).json({
                    status: false,
                    error: `The object can't be found.`
                }).end()

            return res.status(200).json({
                status: true,
                data: verifications
            }).end()
        })

        this.router.get('/servers/:guildId/activity', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            if (isNull(req.params.guildId))
                return res.status(403).json({
                    status: false,
                    error: `The 'server_id' must be specified.`
                }).end()

            const activities = await Activity.find({
                guildId: req.params.guildId
            }, null, {
                limit: 10,
                sort: {
                    'registeredAt': -1
                }
            })

            if (isNull(activities))
                return res.status(403).json({
                    status: false,
                    error: `The activities can't be found.`
                }).end()
            
            return res.status(200).json({
                status: true,
                data: activities
            }).end()
        })

        this.router.get('/servers/:guildId/activity/:id', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => { 
            if (isNull(req.params.id))
                return res.status(403).json({
                    status: false,
                    error: `The 'activity_id' must be specified.`
                }).end()

            const activities = await Activity.findOne({
                _id: req.params.id
            })

            if (isNull(activities))
                return res.status(403).json({
                    status: false,
                    error: `The activity can't be found.`
                }).end()
            
            return res.status(200).json({
                status: true,
                data: activities
            }).end()
        })

        this.router.post('/servers/:guildId/activity/add-activity', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            var data: ActivityModel = req.body

            if (isNull(data.data))
                return res.status(403).json({
                    status: false,
                    error: `You can\'t create a activity without data.`
                }).end()

            new Activity(data.data).save().catch(err => {
                if (err) return this.error(res, 500)
            })

            return res.status(200).json({
                status: true,
                data: {
                    activity: data.data,
                    status: 'CREATED'
                }
            }).end()
        })

        this.router.get('/servers/:guildId/messages', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            if (isNull(req.params.guildId))
                return res.status(403).json({
                    status: false,
                    error: `The 'server_id' must be specified.`
                }).end()

            const messages = await Message.find({ guildId: req.params.guildId })

            if (isNull(messages)) 
                return res.status(403).json({
                    status: false,
                    error: `No messages found in this server.`
                }).end()

            return res.status(200).json({
                status: true,
                data: messages
            }).end()
        })

        this.router.get('/servers/:guildId/messages/:memberId', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            if (req.params.guildId === undefined || req.params.memberId === undefined)
                return res.status(403).json({
                    status: false,
                    error: `You should specify the 'server_id' and 'member_id' first.`
                }).end()

            const messages = await Message.find({ guildId: req.params.guildId, memberId: req.params.memberId })

            if (isNull(messages)) 
                return res.status(403).json({
                    status: false,
                    error: `No messages found for this server/member.`
                }).end()

            return res.status(200).json({
                status: true,
                data: messages
            }).end()
        })
    }
}
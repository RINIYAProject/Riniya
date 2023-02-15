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

export default class GuildRoutes extends AbstractRoutes {
    public register() {
        this.router.get('/servers', async (req, res) => {
            res.status(200).json({
                status: true,
                data: (await Riniya.instance.guilds.fetch()).values || []
            }).end()
        })
        this.router.get('/servers/:guildId', async (req, res) => {
            if (req.params.guildId === undefined)
                this.error(res, 406)
            res.status(200).json({
                status: true,
                data: Riniya.instance.guilds.cache.get(req.params.guildId) || {}
            }).end()
        })

        this.router.get('/servers/:guildId/members', async (req, res) => {
            if (req.params.guildId === undefined)
                this.error(res, 404)
            res.status(200).json({
                status: true,
                data: this.instance.guilds.cache.get(req.params.guildId).members.cache.values()
            })
        })
        this.router.get('/servers/:guildId/members/:memberId', async (req, res) => {
            if (req.params.guildId === undefined)
                this.error(res, 403)
            if (req.params.memberId === undefined)
                this.error(res, 403)
            res.status(200).json({
                status: true,
                data: this.instance.guilds.cache.get(req.params.guildId).members.cache.get(req.params.memberId)
            })
        })
        this.router.get('/servers/:guildId/members/:memberId/level', async (req, res) => { })
        this.router.get('/servers/:guildId/members/:memberId/profile', async (req, res) => { })
        this.router.get('/servers/:guildId/members/:memberId/sanctions', async (req, res) => {
            if (req.params.guildId === undefined || req.params.memberId === undefined)
                this.error(res, 500)
            const sanctions = await Sanction.find({
                guildId: req.params.guildId,
                memberId: req.params.memberId
            })

            res.status(200).json({
                status: true,
                data: sanctions || []
            })
        })

        this.router.get('/servers/:guildId/verifications', async (req, res) => {
            if (req.params.guildId === undefined)
                this.error(res, 403)
            const verifications = await Verification.find({
                guildId: req.params.guildId
            })

            res.status(200).json({
                status: true,
                data: verifications || []
            })
        })
        this.router.get('/servers/:guildId/verifications/:userId', async (req, res) => {
            if (req.params.guildId === undefined || req.params.userId === undefined)
                this.error(res, 403)
            const verifications = await Verification.findOne({
                guildId: req.params.guildId,
                memberId: req.params.userId
            })

            res.status(200).json({
                status: true,
                data: verifications || {}
            })
        })

        this.router.get('/servers/:guildId/activity', async (req, res) => {
            if (req.params.guildId === undefined)
                this.error(res, 500)
            const activities = await Activity.find({
                guildId: req.params.guildId
            }, null, {
                limit: 10,
                sort: {
                    'registeredAt': -1
                }
            })

            res.status(200).json({
                status: true,
                data: activities || []
            })
        })
        this.router.get('/servers/:guildId/activity/:id', async (req, res) => { })
        this.router.post('/servers/:guildId/activity/add-activity', async (req, res) => { })

        this.router.get('/servers/:guildId/messages', async (req, res) => {
            if (req.params.guildId === undefined)
                this.error(res, 404)
            const messages = await Message.find({ guildId: req.params.guildId })
            res.status(200).json({
                status: true,
                data: messages
            })
        })

        this.router.get('/servers/:guildId/messages/:memberId', async (req, res) => {
            if (req.params.guildId === undefined)
                this.error(res, 404)
            if (req.params.memberId === undefined)
                this.error(res, 404)
            const messages = await Message.find({ guildId: req.params.guildId, memberId: req.params.memberId })
            res.status(200).json({
                status: true,
                data: messages
            })
        })
    }
}
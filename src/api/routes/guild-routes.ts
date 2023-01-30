/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   guild-routes.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 13:56:19 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/30 01:11:44 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import AbstractRoutes, { ErrorType } from "../AbstractRoutes";
import { Router } from "express";
import Riniya from "@riniya.ts";

const router = Router();

export default class GuildRoutes extends AbstractRoutes {
    public register(): Router {
        router.get('/servers', async (req, res) => {
            res.status(200).json({
                status: true,
                data: Riniya.instance.guilds || []
            }).end()
        })
        router.get('/servers/:guildId', async (req, res) => {
            if (req.params.guildId === undefined)
                this.error(res, 406)
            res.status(200).json({
                status: true,
                data: Riniya.instance.guilds.cache.get(req.params.guildId) || { }
            }).end()
        })

        router.get('/servers/:guildId/members', async (req, res) => { })
        router.get('/servers/:guildId/members/:memberId', async (req, res) => { })
        router.get('/servers/:guildId/members/:memberId/level', async (req, res) => { })
        router.get('/servers/:guildId/members/:memberId/profile', async (req, res) => { })
        router.get('/servers/:guildId/members/:memberId/sanctions', async (req, res) => { })

        router.get('/servers/:guildId/verifications', async (req, res) => { })
        router.get('/servers/:guildId/verifications/:userId', async (req, res) => { })
        router.get('/servers/:guildId/verifications/:userId/cancel', async (req, res) => { })
        router.get('/servers/:guildId/verifications/:userId/accept', async (req, res) => { })
        router.post('/servers/:guildId/verifications/:userId/ack', async (req, res) => { })

        router.get('/servers/:guildId/activity', async (req, res) => { })
        router.get('/servers/:guildId/activity/:id', async (req, res) => { })
        router.post('/servers/:guildId/activity/add-activity', async (req, res) => { })

        return router
    }
}
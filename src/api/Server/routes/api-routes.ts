/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   api-routes.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 13:56:14 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/15 16:52:20 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from "@riniya.ts";
import Blacklist, { IBlacklist } from "@riniya.ts/database/Common/Blacklist";
import { blacklist, isNull, sanction } from "@riniya.ts/types";
import { v4 } from "uuid";
import AbstractRoutes from "../../Server/AbstractRoutes";



export default class ApiRoutes extends AbstractRoutes {
    public register() {
        this.router.get('/commands', async (req, res) => {
            return res.status(200).json({
                status: true,
                data: Riniya.instance.manager.toList()
            }).end()
        })

        this.router.get('/invite', async (req, res) => {
            return res.status(200).json({
                status: true,
                data: {
                    invite_url: `https://discord.com/api/oauth2/authorize?client_id=${Riniya.instance.application.id}&permissions=8&scope=bot`
                }
            }).end()
        })

        this.router.put('/blacklist/add-user', async (req, res) => {
            const user: IBlacklist = req.body

            if (isNull(user) && !(user as IBlacklist))
                return res.status(403).json({
                    status: false,
                    error: `User type is invalid.`
                }).end() 
            
            new Blacklist(user).save().catch(err => {
                if (err) return res.status(404).json({
                    status: false,
                    error: `Could not save the user data.`
                }).end() 
            })

            blacklist(Riniya.instance.users.cache.get(user.issuedBy), 
                Riniya.instance.users.cache.get(user.userId), 
                user.reason)

            return res.status(200).json({
                status: true,
                data: {
                    metadata: {
                        requestId: v4(),
                        requestDate: Date.now(),
                    },
                    result: user
                }
            }).end() 
        })

        this.router.patch('/blacklist/edit-user', async (req, res) => {
            const user: IBlacklist = req.body

            if (isNull(user) && !(user as IBlacklist))
                return res.status(404).json({
                    status: false,
                    error: `User type if invalid.`
                }).end() 
            
            const result = await Blacklist.updateOne({
                 userId: user.userId,
                 caseId: user.caseId }, user, {
                upsert: true
            })

            if (isNull(result) && !result.acknowledged || result.modifiedCount < 1)
                return res.status(500).json({
                    status: false,
                    error: `The update failed.`
                }).end() 
            
            return res.status(200).json({
                status: true,
                data: {
                    metadata: {
                        requestId: v4(),
                        requestDate: Date.now(),
                        database: result
                    },
                    result: user
                }
            }).end() 
        })

        this.router.delete('/blacklist/remove-user', async (req, res) => {
            if (isNull(req.body.user))
                return res.status(404).json({
                    status: false,
                    error: `You must specify the 'user_id'.`
                }).end()
            
            const user = await Blacklist.deleteOne({ userId: req.body.user })

            if (isNull(user) && !user.acknowledged)
                return res.status(404).json({
                    status: false,
                     error: `This user is not blacklisted.`
                }).end()
                
            return res.status(200).json({
                status: true,
                data: {
                    metadata: {
                        requestId: v4(),
                        requestDate: Date.now(),
                    },
                    result: user
                }
            }).end() 
        })

        this.router.get('/blacklist/get-user/:user', async (req, res) => {
            if (isNull(req.params.user))
                return res.status(404).json({
                    status: false,
                    error: `You must specify the 'user_id'.`
                }).end()

            const user = await Blacklist.findOne({ userId: req.params.user })

            if (isNull(user))
                return res.status(404).json({
                    status: false,
                    error: `This user is not blacklisted.`
                }).end()
            
            return res.status(200).json({
                status: true,
                data: {
                    metadata: {
                        requestId: v4(),
                        requestDate: Date.now(),
                    },
                    result: user
                }
            }).end() 
        })

        this.router.get('/blacklist/get-users', async (req, res) => {
            const users = await Blacklist.find()

            if (isNull(users))
                return res.status(404).json({
                    status: false,
                    error: `No users has been blacklisted.`
                }).end()
            
            return res.status(200).json({
                status: true,
                data: {
                    metadata: {
                        requestId: v4(),
                        requestDate: Date.now(),
                    },
                    result: users
                }
            }).end()
        })
    }
}
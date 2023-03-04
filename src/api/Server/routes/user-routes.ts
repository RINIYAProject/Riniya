/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user-routes.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 13:56:44 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/06 21:15:04 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Blocklist, { Blocklist as IBlocklist } from "@riniya.ts/database/Moderation/Blocklist";
import AbstractRoutes from "../../Server/AbstractRoutes";

import { Client as TwitterClient } from "twitter-api-sdk"

const client = new TwitterClient(process.env['TWITTER_TOKEN'] || "no_token");

export default class UserRoutes extends AbstractRoutes {
    public register() {
        this.router.post('/block-list/create', (req, res) => {
            if (req.body.ids === undefined) {
                res.status(404).json({
                    status: false,
                    error: 'ID is not set.'
                })
            } else {
                const data: string[] = req.body.ids;
                if (data.length < 1) {
                    res.status(500).json({
                        status: false,
                        error: "Your ids array must contain at least one element."
                    })
                } else {
                    data.forEach(value => {
                        new Blocklist({
                            twitterId: value
                        }).save()
                    });

                    res.status(200).json({
                        status: true,
                        data: {
                            index: data.length,
                            message: "SUCCESS"
                        }
                    })
                }
            }
        });

        this.router.get('/block-list/fetchAll', async (req, res) => {
            this.cache.exists("block-list/all").then(async result => {
                if (result) {
                    this.cache.getObject<{
                        twitterId: string;
                    }[]>("block-list/all").then(result => {
                        res.status(200).json({
                            status: true,
                            data: {
                                cacheInfo: {
                                    objectId: result.objectId,
                                    createdAt: result.cachedAt
                                },
                                accounts: result.data
                            }
                        });
                    }).catch((reason) => {
                        res.status(500).json({
                            status: false,
                            error: reason
                        });
                    })
                } else {
                    const blocklist = (await Blocklist.find()).map(x => {
                        return {
                            twitterId: x.twitterId
                        }
                    })
                    this.cache.addObject<{
                        twitterId: string;
                    }[]>("block-list/all", blocklist, 60000).then(result => {
                        res.status(200).json({
                            status: true,
                            data: result
                        });
                    }).catch(err => {
                        res.status(500).json({
                            status: false,
                            error: "Caching problem. Please contact a administrator.",
                            message: err
                        });
                    })
                }
            })
        });

        this.router.get('/block-list/fetch/:id', async (req, res) => {
            if (req.params.id === undefined) {
                res.status(404).json({
                    status: false,
                    error: "Account ID cannot be null."
                });
            } else {
                this.cache.exists("block-list/by-id/" + req.params.id).then(result => {
                    if (result) {
                        this.cache.getObject<{}>("block-list/by-id/" + req.params.id).then(document => {
                            res.status(200).json({
                                status: true,
                                data: {
                                    cacheInfo: {
                                        objectId: document.objectId,
                                        createdAt: document.cachedAt
                                    },
                                    account: document.data
                                }
                            })
                        }).catch((reason) => {
                            res.status(500).json({
                                status: false,
                                error: reason
                            });
                        })
                    } else {
                        client.users.findUserById(req.params.id).then((data) => {
                            this.cache.addObject<{}>("block-list/by-id/" + req.params.id, data?.data, 60000).then(result => {
                                res.status(200).json({
                                    status: true,
                                    data: result
                                });
                            }).catch((reason) => {
                                res.status(404).json({
                                    status: false,
                                    error: reason
                                });
                            })
                        }).catch((reason) => {
                            res.status(404).json({
                                status: false,
                                error: reason
                            });
                        })
                    }
                })
            }
        })

        this.router.get("/block-list/:id", async (req, res) => {
            if (req.params.id === undefined)
                this.error(res, 400)
            try {
                const data = await Blocklist.findOne({ twitterId: req.params.id })
                res.status(200).json({
                    status: true,
                    data: data || { accountId: null }
                })
            } catch (err) {
                this.error(res, 403)
            }
        })
    }
}
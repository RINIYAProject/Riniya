/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user-routes.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 13:56:44 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/06 17:02:08 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Blocklist from "@riniya.ts/database/Moderation/Blocklist";
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
            const blocklist = (await Blocklist.find()).map(async (id) => {
                const account = await client.users.findUserById(id.twitterId);

                return {
                    accountId: id.twitterId,
                    accountName: account.data.name || "Account is deleted.",
                    accountUsername: account.data.username || "Account is deleted."
                }
            });

            res.status(200).json({
                status: true,
                data: blocklist
            });
        });

        this.router.get('/block-list/fetch/:id', async (req, res) => {
            if (req.params.id === undefined) {
                res.status(404).json({
                    status: false,
                    error: "Account ID cannot be null."
                });
            } else {
                client.users.findUserById(req.params.id).then((data) => {
                    res.status(200).json({
                        status: true,
                        data: data.data
                    });
                }).catch((reason) => {
                    res.status(404).json({
                        status: false,
                        error: reason
                    });
                });
            }
        })
    }
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user-routes.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 13:56:44 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/06 05:28:34 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Blocklist from "@riniya.ts/database/Moderation/Blocklist";
import AbstractRoutes from "../../Server/AbstractRoutes";

export default class UserRoutes extends AbstractRoutes {
    public register() {
        this.router.post('/block-list/create', (req, res) => {
            if (req.body.id) {
                res.status(404).json({
                    status: false,
                    error: 'ID is not set.'
                })
            } else {
                new Blocklist({
                    twitterId: req.body.id
                }).save().then(() => {
                    res.status(200).json({
                        status: true,
                        data: {
                            status: 'REGISTERED'
                        }
                    })
                }).catch(() => {
                    res.status(403).json({
                        status: false,
                        error: "Failed to save the ID."
                    })
                })
            }
        });

        this.router.get('/block-list/fetchAll', async (req, res) => {
            const blocklist = (await Blocklist.find()).map((id) => {
                return {
                    accountId: id
                }
            });

            res.status(200).json({
                status: true,
                data: blocklist
            });
        })
    }
}
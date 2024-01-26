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
import AbstractRoutes from "../../Server/AbstractRoutes";
import Member from '@riniya.ts/database/Guild/Member'

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

        this.router.get('/stats', async (req, res) => {
          return res.status(200).json({
            status: true,
            data: {
              guilds: Riniya.instance.guilds.cache.size,
              users: await Member.countDocuments(),
              commands: Riniya.instance.manager.toList().length
            }
          }).end()
        })

        this.router.get('/legal/:type', async (req, res) => {
            return res.status(200).json({
                status: true,
                data: {
                    url: `https://cdn.riniya.uk/legal/${req.params.type}/pdf`,
                    contact: {
                        email: {
                            billings: "billings@riniya.uk",
                            contact: "contact@riniya.uk",
                            abuse: "abuse@riniya.uk"
                        }
                    }
                }
            }).end()
        })
    }
}

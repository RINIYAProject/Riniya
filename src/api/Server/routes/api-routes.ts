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

export interface Statistics {
    guilds: number;
    users: number;
    commands: number;
}

export default class ApiRoutes extends AbstractRoutes {
    public register() {
        this.router.get('/cmd', async (req, res) => {
            return res.status(200).json({
                status: true,
                data: Riniya.instance.manager.toList()
            }).end()
        })

        this.router.get('/invite', async (req, res) => {
            return res.status(200).json({
                status: true,
                data: {
                    invite_url: `https://discord.com/api/oauth2/authorize?client_id=${Riniya.instance.application.id}&permissions=23427300781831&scope=bot`
                }
            }).end()
        })

        this.router.get('/stats', async (req, res) => {
          this.cache.exists("statistics").then(exists => {
              if (exists) {
                this.cache.getObject<Statistics>("statistics").then(data => {
                  return res.status(200).json({
                    status: true,
                    data: {
                      metadata: {
                         objectId: data.objectId,
                         cachedAt: data.cachedAt
                      },
                      data: data.data
                    }
                  }).end()
                })
              } else {
                Member.countDocuments().then(r => {
                  this.cache.addObject<Statistics>("statistics", {
                    guilds: Riniya.instance.guilds.cache.size,
                    users: r,
                    commands: Riniya.instance.manager.toList().length
                  }, 300).then(result => {
                    return res.status(200).json({
                      status: true,
                      data: {
                        guilds: result.guilds,
                        users: result.users,
                        commands: result.commands
                      }
                    }).end()
                  })
                })
              }
          })
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

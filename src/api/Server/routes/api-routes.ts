/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   api-routes.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 13:56:14 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/30 16:47:08 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from "@riniya.ts";
import AbstractRoutes from "../../Server/AbstractRoutes";

export default class ApiRoutes extends AbstractRoutes {
    public register() {
        this.router.get('/commands', async (req, res) => {
            res.status(200).json({
                status: true,
                data: Riniya.instance.manager.toList() || []
            })
        })

        this.router.get('/invite', async (req, res) => {
            res.status(200).json({
                status: true,
                data: {
                    invite_url: `https://discord.com/api/oauth2/authorize?client_id=${Riniya.instance.application.id}&permissions=8&scope=bot`
                }
            })
        })
    }
}
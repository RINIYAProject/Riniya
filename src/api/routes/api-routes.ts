/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   api-routes.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 13:56:14 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/30 00:58:02 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from "@riniya.ts";
import AbstractRoutes from "../AbstractRoutes";
import { Router } from "express";

const router = Router();

export default class ApiRoutes extends AbstractRoutes {
    public register(): Router {
        router.get('/commands', async (req, res) => {
            res.status(200).json({
                status: true,
                data: Riniya.instance.manager.toList() || []
            })
        })

        router.get('/invite', async (req, res) => {
            res.status(200).json({
                status: true,
                data: {
                    invite_url: `https://discord.com/api/oauth2/authorize?client_id=${Riniya.instance.application.id}&permissions=8&scope=bot`
                }
            })
        })

        return router
    }
}
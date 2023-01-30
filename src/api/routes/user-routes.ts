/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user-routes.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 13:56:44 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/30 00:57:07 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Router } from "express";
import AbstractRoutes from "../AbstractRoutes";

const router = Router();

export default class UserRoutes extends AbstractRoutes {
    public register(): Router {
        return router
    }
}
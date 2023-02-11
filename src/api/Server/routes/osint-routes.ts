/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   osint-routes.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/02/10 23:21:03 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/11 03:31:44 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import AbstractRoutes from "../AbstractRoutes";

export default class OsintRoutes extends AbstractRoutes {
    public register() {
        this.router.post('/osint/phone', async (req, res) => {
            if (req.body.identifier === undefined)
                return res.status(403).json({
                    status: false,
                    error: "The identifier cannot be null."
                })
            res.status(403).json({
                status: false,
                error: "Not Implemented Yet."
            })
        })
    }
}
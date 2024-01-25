/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AuthHelper.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/02/02 03:15:56 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/11 04:14:06 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import History from "@riniya.ts/database/Security/History";
import Invalidated from "@riniya.ts/database/Security/Invalidated";
import Session from "@riniya.ts/database/Security/Session";
import { isNull } from "@riniya.ts/types";

export declare interface ISession {
    userId: string;
    accessToken: string;
    clientToken: string;
    sessionExpiry: number;
    expired: boolean;
}

export declare interface ICallback {
    status: boolean;
    session?: ISession;
    error?: string;
}

export default class AuthHelper {
    public async identify(accessToken: string, clientToken: string, callback: Function) {
        const SessionData = await Session.findOne({
            accessToken: accessToken,
            clientToken: clientToken
        })

        if (isNull(SessionData.userId)) {
            callback({
                status: false,
                error: 'INVALID_CREDENTIALS',
                message: "The client or access token is invalid."
            })
        } else {
            await new History({
              userId: SessionData.userId,
              accessToken: SessionData.accessToken,
              clientToken: SessionData.clientToken,
              createdAt: Date.now()
            }).save();

            const invalidated = await Invalidated.findOne({
                accessToken: accessToken,
                clientToken: clientToken
            })

            if (!isNull(invalidated.userId)) {
                return callback({
                    status: false,
                    error: "This session has been invalidated."
                })
            }

            callback({
                status: true,
                session: {
                    userId: SessionData.userId,
                    accessToken: SessionData.accessToken,
                    clientToken: SessionData.clientToken,
                    sessionExpiry: SessionData.sessionExpiry,
                    expired: SessionData.sessionExpired
                }
            })
        }
    }
}

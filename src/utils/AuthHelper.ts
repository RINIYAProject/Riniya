/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AuthHelper.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/02/02 03:15:56 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/02 03:15:57 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import History from "@riniya.ts/database/Security/History";
import Session from "@riniya.ts/database/Security/Session";
import User from "@riniya.ts/database/Security/User";
import { v4 } from "uuid";
import { Permissions } from "./Permissions";

export declare interface ISession {
    accessToken: string;
    clientToken: string;
    sessionExpiry: number;
}

export declare interface ICallback {
    status: boolean;
    session?: ISession;
    error?: string;
}

export default class AuthHelper {
    public async login(username: string, password: string, callback: Function) {
        const UserData = await User.findOne({
            username: username,
            password: password
        })
        if (!UserData)
            callback({
                status: false,
                error: 'MISSING_USER'
            })
        if (UserData.permissions >= Permissions.GET) {
            const session: ISession = await this.createSession(UserData._id);
            callback({
                status: true,
                session: session
            })
        } else {
            callback({
                status: false,
                error: 'INSUFFICIENT_PERMISSION'
            })
        }
    }

    public async identify(accessToken: string, clientToken: string, callback: Function) {
        const SessionData = await Session.findOne({
            accessToken: accessToken,
            clientToken: clientToken,
            sessionExpired: false
        })

        if (!SessionData)
            callback({
                status: false,
                error: 'MISSING_SESSION'
            })

        new History({
            userId: SessionData.userId,
            accessToken: SessionData.accessToken,
            clientToken: SessionData.clientToken,
            createdAt: new Date()
        }).save();

        callback({
            status: true,
            session: {
                accessToken: SessionData.accessToken,
                clientToken: SessionData.clientToken,
                sessionExpiry: SessionData.sessionExpiry
            }
        })
    }

    public async invalidateAll(userId: string, callback: Function) {
        const sessions = await Session.find({
            userId: userId,
            sessionExpired: false
        });
        sessions.forEach((result) => Session.updateOne({ _id: result._id }, { sessionExpired: true }, {}))
    }

    private async createSession(userId: string): Promise<ISession> {
        const accessToken: string = v4()
        const clientToken: string = v4()
        const sessionExpiry: number = new Date().setMonth(6, Date.now())

        new Session({
            userId: userId,

            accessToken: accessToken,
            clientToken: clientToken,

            sessionExpiry: sessionExpiry,
            sessionExpired: false
        }).save();

        return {
            accessToken: accessToken || '',
            clientToken: clientToken || '',
            sessionExpiry: sessionExpiry || 0
        }
    }
}
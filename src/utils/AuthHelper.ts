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
import Session from "@riniya.ts/database/Security/Session";
import User, { User as IUser } from "@riniya.ts/database/Security/User";
import { v4 } from "uuid";

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
        else {
            const session: ISession = await this.createSession(UserData._id);
            callback({
                status: true,
                session: session
            })
        }
    }

    public async identify(accessToken: string, clientToken: string, callback: Function) {
        const SessionData = await Session.findOne({
            accessToken: accessToken,
            clientToken: clientToken
        })

        if (!SessionData) {
            callback({
                status: false,
                error: 'MISSING_SESSION'
            })
        } else {
            new History({
                userId: SessionData.userId,
                accessToken: SessionData.accessToken,
                clientToken: SessionData.clientToken,
                createdAt: new Date()
            }).save();

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
        const sessionExpiry: number = 300

        new Session({
            userId: userId,

            accessToken: accessToken,
            clientToken: clientToken,

            sessionExpiry: sessionExpiry,
            sessionExpired: false
        }).save();

        return {
            userId: userId,
            accessToken: accessToken,
            clientToken: clientToken,
            sessionExpiry: sessionExpiry,
            expired: false
        }
    }
}
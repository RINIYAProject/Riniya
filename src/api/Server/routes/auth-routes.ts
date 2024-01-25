import Riniya from "@riniya.ts";
import Invalidated from "@riniya.ts/database/Security/Invalidated";
import Session from "@riniya.ts/database/Security/Session";
import User from "@riniya.ts/database/Security/User";
import { isNull } from "@riniya.ts/types";
import { MessageEmbed } from "discord.js";
import { v4 } from "uuid";
import AbstractRoutes from "../AbstractRoutes";

import moment from "moment";

export default class AuthRoutes extends AbstractRoutes {
    public register() {
       this.router.post("/security/login", async (req, res) => {
         const username: string = req.body.username
         const password: string = req.body.password

         if (isNull(username) || isNull(password)) {
           return res.status(403).json({
             status: false,
             error: "INVALID_PASSWORD_OR_USERNAME",
             message: "The password or username is not valid."
           })
         }

         const database = await User.findOne({
           username: username,
           password: password
         })

         if (isNull(database.username) && isNull(database.password) && isNull(database.discordId)) {
           return res.status(403).json({
             status: false,
             error: "INVALID_PASSWORD_OR_USERNAME",
             message: "The password or username is not valid."
           })
         }

         if (!isNull(database.banned) && !isNull(database.banned.issuer)) {
           return res.status(403).json({
             status: false,
             error: "ACCOUNT_BANNED",
             message: "This account has been banned.",
             data: database.banned
           })
         }

         if (isNull(database.metadata?.permissions["admin:auth"])) {
           return res.status(403).json({
             status: false,
             error: "INSUFFICIENT_PERMISSION"
           })
         }

         const authenticated = await Session.findOne({
           userId: database._id,
           sessionExpired: false
         })

         if (!isNull(authenticated) && !isNull(authenticated.accessToken)) {
           return res.status(200).json({
             status: true,
             data: {
               metadata: {
                 requestId: v4(),
                 requestDate: Date.now()
               },
               session: authenticated
             }
           })
         }

         const accessToken: string = v4();
         const clientToken: string = v4();

         const session = await new Session({
           userId: database._id,
           accessToken: accessToken,
           clientToken: clientToken,
           sessionExpiry: 300,
           sessionExpired: false
         }).save()

         await Riniya.instance.users.cache.get(database.discordId).send({
           embeds: [
             new MessageEmbed()
               .setTitle("API Login detected")
               .setColor("RED")
               .setDescription(`New login at ${moment(Date.now())}. If this action has been made on your behalf. Please terminate this session.`)
           ],
           components: [
             {
               type: 1,
               components: [
                 Riniya.instance.buttonManager.createLinkButton("Terminate", "https://api.riniya.uk/api/security/invalidate/" + accessToken)
               ]
             }
           ]
         })

         return res.status(200).json({
           status: true,
           data: {
             metadata: {
               requestId: v4(),
               requestDate: Date.now()
             },
             session: session
           }
         })
       })

       this.router.get("/security/invalidate/:accessToken", async (req, res) => {
            if (isNull(req.params.accessToken)) {
                return res.status(403).json({
                    status: false,
                    error: "Missing session token."
                })
            }

            const session = await Session.findOne({
                accessToken: req.params.accessToken
            })

            if (isNull(session.clientToken) && isNull(session._id)) {
                return res.status(403).json({
                    status: false,
                    error: "This session is not found."
                })
            } else if (session.sessionExpired) {
                return res.status(403).json({
                    status: false,
                    error: "This session is already expired."
                })
            }

            await new Invalidated({
                userId: session.userId,
                accessToken: session.accessToken,
                clientToken: session.clientToken
            }).save().catch(err => {
                if (!isNull(err)) return res.status(403).json({
                    status: false,
                    error: "Unable to invalidate the session."
                })
            })

            const check = await Invalidated.findOne({
                userId: session.userId,
                accessToken: session.accessToken,
                clientToken: session.clientToken
            })

            if (!isNull(check) && !isNull(check.userId)) {
                return res.status(200).json({
                    status: false,
                    error: "This session cannot be terminated twice."
                })
            }

            return res.status(200).json({
                status: true,
                data: {
                    metadata: {
                        requestId: v4(),
                        requestDate: Date.now()
                    },
                    result: "INVALIDATED"
                }
            })
       })
    }
}

import Riniya from "@riniya.ts";
import Invalidated from "@riniya.ts/database/Security/Invalidated";
import Session from "@riniya.ts/database/Security/Session";
import User from "@riniya.ts/database/Security/User";
import { isNull } from "@riniya.ts/types";
import { MessageEmbed } from "discord.js";
import { v4 } from "uuid";
import AbstractRoutes from "../AbstractRoutes";

export default class AuthRoutes extends AbstractRoutes {
    public register() {
       this.router.post("/security/login", async (req, res) => {
            var username: String = req.body.username
            var password: String = req.body.password

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

            if (database.permissions < 0x0000010000) {
                return res.status(403).json({
                    status: false,
                    error: "INSUFFICIENT_PERMISSION"
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

            Riniya.instance.users.cache.get(database.discordId).send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("API Login detected")
                        .setColor("RED")
                        .setDescription(`Login at ${Date.toString()} detected, if this is not you please click on "Invalidate".`)
                ],
                components: [
                    {
                        type: 1,
                        components: [
                            Riniya.instance.buttonManager.createLinkButton("Invalidate", "https://api.riniya.uk/api/security/invalidate/" + accessToken)
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
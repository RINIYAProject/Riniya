import Riniya from "@riniya.ts";
import { blacklist, isNull } from "@riniya.ts/types";
import Blacklist, { IBlacklist } from "@riniya.ts/database/Common/Blacklist";

import { v4 } from "uuid";
import AbstractRoutes from "../AbstractRoutes";

export default class BlacklistRoutes extends AbstractRoutes {
    public register() {
        this.router.put('/blacklist/add-user', (req, res, next) => this.auth.handle(req, res, next),  async (req, res) => {
            const user: IBlacklist = req.body

            if (isNull(user))
                return res.status(403).json({
                    status: false,
                    error: `User type is invalid.`
                }).end() 
            
            new Blacklist(user).save().catch(err => {
                if (err) return res.status(404).json({
                    status: false,
                    error: `Could not save the user data.`
                }).end() 
            })

            blacklist(Riniya.instance.users.cache.get(user.issuedBy), 
                Riniya.instance.users.cache.get(user.userId), 
                user.reason)

            return res.status(200).json({
                status: true,
                data: {
                    metadata: {
                        requestId: v4(),
                        requestDate: Date.now(),
                    },
                    result: user
                }
            }).end() 
        })

        this.router.patch('/blacklist/edit-user', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            const user: IBlacklist = req.body

            if (isNull(user) && !(user as IBlacklist))
                return res.status(404).json({
                    status: false,
                    error: `User type if invalid.`
                }).end() 
            
            const result = await Blacklist.updateOne({
                 userId: user.userId,
                 caseId: user.caseId }, user, {
                upsert: true
            })

            if (isNull(result) && !result.acknowledged || result.modifiedCount < 1)
                return res.status(500).json({
                    status: false,
                    error: `The update failed.`
                }).end() 
            
            return res.status(200).json({
                status: true,
                data: {
                    metadata: {
                        requestId: v4(),
                        requestDate: Date.now(),
                        database: result
                    },
                    result: user
                }
            }).end() 
        })

        this.router.delete('/blacklist/remove-user', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            if (isNull(req.body.user))
                return res.status(404).json({
                    status: false,
                    error: `You must specify the 'user_id'.`
                }).end()
            
            const user = await Blacklist.deleteOne({ userId: req.body.user })

            if (isNull(user) && !user.acknowledged)
                return res.status(404).json({
                    status: false,
                     error: `This user is not blacklisted.`
                }).end()
                
            return res.status(200).json({
                status: true,
                data: {
                    metadata: {
                        requestId: v4(),
                        requestDate: Date.now(),
                    },
                    result: user
                }
            }).end() 
        })

        this.router.get('/blacklist/get-user/:user', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            if (isNull(req.params.user))
                return res.status(404).json({
                    status: false,
                    error: `You must specify the 'user_id'.`
                }).end()

            const user = await Blacklist.findOne({ userId: req.params.user })

            if (isNull(user))
                return res.status(404).json({
                    status: false,
                    error: `This user is not blacklisted.`
                }).end()
            
            return res.status(200).json({
                status: true,
                data: {
                    metadata: {
                        requestId: v4(),
                        requestDate: Date.now(),
                    },
                    result: user
                }
            }).end() 
        })

        this.router.get('/blacklist/get-users', (req, res, next) => this.auth.handle(req, res, next), async (req, res) => {
            const users = await Blacklist.find()

            if (isNull(users))
                return res.status(404).json({
                    status: false,
                    error: `No users has been blacklisted.`
                }).end()
            
            return res.status(200).json({
                status: true,
                data: {
                    metadata: {
                        requestId: v4(),
                        requestDate: Date.now(),
                    },
                    result: users
                }
            }).end()
        })
    }
}
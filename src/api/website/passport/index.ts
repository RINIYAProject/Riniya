import { Express, NextFunction } from 'express'
import DiscordPassport from "passport-discord";
import Refresh from "passport-oauth2-refresh";
import passport from "passport";
import DiscordAccount ,{ DiscordAccount as DAccount } from '@riniya.ts/database/Social/DiscordAccount'
import { isNull } from '@riniya.ts/types'
import Discord from '../utils/Discord'

const scopes = ['identify', 'email', 'guilds', 'guilds.join']

export interface User {
  internal: string;
  userId: string;
  username: string;
  email: string;
}

export interface IUser {
  user: User;
  avatar: string;
  guilds: DiscordPassport.GuildInfo[]
}

export default class Passport {
  public init(app: Express) {
    app.use(passport.initialize())
    app.use(passport.authenticate('session'))

    const discordStrategy = new DiscordPassport.Strategy({
      clientID: process.env["DISCORD_CLIENT_ID"],
      clientSecret: process.env["DISCORD_CLIENT_SECRET"],
      callbackURL: process.env["DISCORD_REDIRECT_URI"],
      scope: scopes
    },async function(accessToken, refreshToken, profile, cb) {
        const account = await DiscordAccount?.exists({ userId: profile.id })
        if (isNull(account)) {
            new DiscordAccount({
                userId: profile.id,
                username: profile.username,
                email: profile.email,
                tokens: {
                  expires_at: 0,
                  expires_in: 0,
                  refresh_token: refreshToken,
                  access_token: accessToken
                }
            }).save().then(r =>  cb(null, {
              user: {
                internal: r._id,
                userId: profile.id,
                username: profile.username,
                email: profile.email
              },
              avatar: profile.avatar,
              guilds: profile.guilds
            })).catch(err => cb(err))
        } else {
          Refresh.requestNewAccessToken('discord', refreshToken, async function(err, accessToken, refreshToken) {
            if (err) {
                throw err
            }

            await DiscordAccount.updateOne({ userId: profile.id }, {
              $set: {
                userId: profile.id,
                username: profile.username,
                email: profile.email,
                tokens: {
                  expires_at: 0,
                  expires_in: 0,
                  refresh_token: refreshToken,
                  access_token: accessToken
                }
              }
            }).then(r =>  cb(null, {
              user: {
                internal: r.upsertedId,
                userId: profile.id,
                username: profile.username,
                email: profile.email
              },
              avatar: profile.avatar,
              guilds: profile.guilds
            }))
          });
        }
    })

    passport.use(discordStrategy)
    Refresh.use(discordStrategy)
  }
}

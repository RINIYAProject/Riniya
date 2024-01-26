import AbstractRoutes from '../../Server/AbstractRoutes'
import Discord from '../utils/Discord'
import { v4 } from 'uuid'
import { isNull } from '@riniya.ts/types'
import DiscordAccount from '@riniya.ts/database/Social/DiscordAccount'
import { CustomRequest } from '../index'

export default class Auth extends AbstractRoutes {
    async register () {
      this.router.get('/user/login', async function (req: CustomRequest, res) {

        let clientState = v4()

        const oauthURL = await Discord.getOAuthUrl({
          userUUID: clientState
        })

        res.cookie('clientState', clientState, {
          maxAge: 1000 * 60 * 5,
          signed: true
        });
        res.redirect(oauthURL.url.toString())
      })

      this.router.get('/user/callback', async function (req: CustomRequest, res) {
        const code = String(req.query.code);
        const discordState = String(req.query.state);
        // make sure the state parameter exists
        const clientState = req.signedCookies['clientState'];

        if (clientState !== discordState) {
          console.error('State verification failed.');
          return res.status(403).json({
            status: false,
            error: "INVALID_CLIENT_STATE",
            message: 'The client state value is unexpected.'
          })
        }
        await Discord.getOAuthTokens(code).then(async result => {
          if (isNull(result)) {
            return res.status(403).json({
              status: false,
              error: "INVALID_STRUCT",
              message: 'The request structure is invalid.'
            })
          }

          await Discord.getUserData(result).then(async user => {
            if (isNull(user)) {
              return res.status(403).json({
                status: false,
                error: "INVALID_STRUCT",
                message: 'Cannot fetch the user data.'
              })
            }
            const userId = user.user.id;

            const account = await DiscordAccount.findOne({ userId: userId }, { tokens: -1, __v: -1})

            if (isNull(account._id)) {
              await new DiscordAccount({
                userId: userId,
                email: user.user.email,
                username: user.user.username,
                tokens: {
                  access_token: result.access_token,
                  refresh_token: result.refresh_token,
                  expires_in: result.expires_in,
                  expires_at: Date.now() + result.expires_in * 1000
                },
                uuid: discordState
              }).save().then(r => {
                res.cookie('session', {
                  user: r,
                  internal: r._id
                }, {
                  maxAge: 1000 * 60 * 5,
                  signed: true
                });
              })
            } else {
              await DiscordAccount.updateOne({
                 userId: userId
              }, {
                $set: {
                  userId: userId,
                  email: user.user.email,
                  username: user.user.username,
                  tokens: {
                    access_token: result.access_token,
                    refresh_token: result.refresh_token,
                    expires_in: result.expires_in,
                    expires_at: Date.now() + result.expires_in * 1000
                  },
                  uuid: discordState
                }
              })

              res.cookie('session', {
                user: account,
                internal: account._id
              }, {
                maxAge: 1000 * 60 * 5,
                signed: true
              });
            }

            res.status(200).redirect("https://www.riniya.uk/dashboard")
          })
        })
      })
    }

}

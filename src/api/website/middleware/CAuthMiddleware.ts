import BaseMiddleware from "../../Server/BaseMiddleware";
import { Response } from "express";
import { isNull } from "@riniya.ts/types";
import { CustomRequest, CustomResponse } from '../index'
import DiscordAccount from '@riniya.ts/database/Social/DiscordAccount'
import Discord from '../utils/Discord'
import Riniya from '@riniya.ts'
import { MessageEmbed } from 'discord.js'
import moment from 'moment/moment'

export default class CAuthMiddleware extends BaseMiddleware {

    public constructor() {
        super("ClientAuthentication", "Authentication middleware for the website")
    }

    public async handle(request: CustomRequest, response: CustomResponse, next) {
      console.log(request.cookies['session'])
      console.log(response.internal)

        let session = request.signedCookies['session']
        if (isNull(session.internal)) {
            return response.redirect("https://www.riniya.uk/user/login")
        } else {
          const account = await DiscordAccount.findOne({ _id: session.internal })
          if (isNull(account)) {
            return response.redirect("https://www.riniya.uk")
          }
          const tokens = await Discord.getAccessToken(account.userId, account.tokens)
          if (isNull(tokens.access_token)) {
            // Deleting the account because the refresh token is invalidated.
            await DiscordAccount.deleteOne({ _id: account._id })
          }

          await Riniya.instance.users.fetch(account.userId).then(user => {
            user.send({
              embeds: [
                new MessageEmbed()
                  .setTitle("Dashboard Login detected.")
                  .setColor("RED")
                  .setDescription(`New login at ${moment(Date.now())}. If this action has been made on your behalf. Please terminate this session.`)
              ],
              components: [
                {
                  type: 1,
                  components: [
                    Riniya.instance.buttonManager.createLinkButton("Terminate", "https://api.riniya.uk/api/security/invalidate/" + account._id)
                  ]
                }
              ]
            })
          })

          next()
        }
    }
}

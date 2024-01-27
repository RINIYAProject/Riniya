import { Express, Request } from 'express'
import { IUser } from '../passport'
import Guild from '@riniya.ts/database/Guild/Guild'
import { isNull } from '@riniya.ts/types'
import Riniya from '@riniya.ts'
import AbstractWebRoutes from '../../Server/AbstractWebRoutes'
import { isUserLogged } from '../utils/Middleware'

export default class Dashboard extends AbstractWebRoutes {
  async register (app: Express) {

    app.get('/dashboard/onboard/setup/:guild/:step', isUserLogged, async function (req: Request, res) {
      const user = req.user as IUser
      res.render('dashboard/views/onboard', {
        title: 'Setting up RINIYA',
        url: `https://www.riniya.uk/profile/${user.user.userId}`,
        avatar: `background-image: url(${user.avatar});`,
        username: user.user.username,
        guild: Riniya.instance.guilds.cache.get(req.params.guild),
        isFirst: true
      })
    })
    app.get('/dashboard/onboard', isUserLogged, async function (req: Request, res) {
      const user = req.user as IUser
      const userGuilds = user.guilds.map(async x => {
        const dGuild = Riniya.instance.guilds.cache.get(x.id);
        const requester = dGuild.members.cache.get(user.user.userId)
        if (isNull(requester.permissions.has("ADMINISTRATOR"))) {
          return {
             guilds: {
                isInternal: await Guild.findOne({ guildId: dGuild.id }) || false,
                data: {
                   name: dGuild.name,
                   iconURL: dGuild.iconURL({ format: 'png', size: 64 }),
                   ownerId: dGuild.ownerId,
                   memberCount: dGuild.memberCount
                }
             }
          }
        }
      })

      res.render('dashboard/views/onboard', {
        title: 'Select your server.',
        url: `https://www.riniya.uk/profile/${user.user.userId}`,
        avatar: `background-image: url(${user.avatar});`,
        username: user.user.username,
        guild: JSON.stringify(userGuilds),
        isFirst: false
      })
    })

    // Dynamic router
    app.get('/dashboard/:guildId/:slug?/:route?/:operation?/:id?', isUserLogged, async function (req: Request, res) {
      // User and guilds data
      const user = req.user as IUser

      const isHandled = await Guild.findOne({ guildId: req.params.guildId });
      if (isNull(isHandled)) {
          return res.redirect("https://www.riniya.uk")
      }

      const dGuild = Riniya.instance.guilds.cache.get(isHandled.guildId);
      const requester = dGuild.members.cache.get(user.user.userId)
      if (isNull(requester) || !isNull(requester.permissions.has("ADMINISTRATOR"))) {
          return res.redirect("https://www.riniya.uk")
      }

      // Managing the route
      if (isNull(req.params.slug) && isNull(req.params.route)) {
        res.render('dashboard/views/index', {
          title: 'Dashboard',
          url: `https://www.riniya.uk/profile/${user.user.userId}`,
          avatar: `background-image: url(${user.avatar});`,
          username: user.user.username,
          guild: dGuild
        })
      } else {
        if (isNull(req.params.operation)) {
          res.render(`dashboard/views/${req.params.slug}/${req.params.route}`, {
            title: 'Dashboard',
            url: `https://www.riniya.uk/profile/${user.user.userId}`,
            avatar: `background-image: url(${user.avatar});`,
            username: user.user.username,
            guild: dGuild
          })
        } else {
          if (isNull(req.params.id)) {
            res.render(`dashboard/views/${req.params.slug}/${req.params.route}/${req.params.operation}`, {
              title: 'Dashboard',
              url: `https://www.riniya.uk/profile/${user.user.userId}`,
              avatar: `background-image: url(${user.avatar});`,
              username: user.user.username,
              guild: dGuild
            })
          } else {
            res.render(`dashboard/views/${req.params.slug}/${req.params.route}/${req.params.id}/${req.params.operation}`, {
              title: 'Dashboard',
              url: `https://www.riniya.uk/profile/${user.user.userId}`,
              avatar: `background-image: url(${user.avatar});`,
              username: user.user.username,
              guild: dGuild
            })
          }
        }
      }
    })
  }
}

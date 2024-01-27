import passport from 'passport'
import AbstractWebRoutes from '../../Server/AbstractWebRoutes'
import { Express } from 'express'

export default class Auth extends AbstractWebRoutes {
    async register (app: Express) {
      app.get('/user/login', passport.authenticate("discord"));
      app.get('/user/logout', function (req, res) {
          req.logout(req.user, () => {
            return res.redirect('https://www.riniya.uk')
          })
      });

      app.get('/user/callback',  passport.authenticate('discord', {
        failureRedirect: '/',
      }), function(req, res) {
          res.redirect('https://www.riniya.uk/dashboard/onboard')
      })
    }
}

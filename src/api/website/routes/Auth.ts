import AbstractRoutes from '../../Server/AbstractRoutes'
import passport from 'passport'

export default class Auth extends AbstractRoutes {
    async register () {
      this.router.get('/user/login', passport.authenticate("discord"));
      this.router.get('/user/callback',  passport.authenticate('discord', {
        failureRedirect: '/',
      }), function(req, res) {
        res.render('dashboard', {
            user: req.user
        })
      })
    }
}

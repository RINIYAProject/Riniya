import AbstractRoutes from '../../Server/AbstractRoutes'
import passport from 'passport'

export default class Auth extends AbstractRoutes {
    async register () {

      this.prefix = 'auth'

      this.router.get('/user/login', passport.authenticate("discord"));
      this.router.get('/user/logout', function (req, res) {
          req.logout(req.user, () => {
            return res.redirect('https://www.riniya.uk')
          })
      });

      this.router.get('/user/callback',  passport.authenticate('discord', {
        failureRedirect: '/',
      }), function(req, res) {
          res.redirect('https://www.riniya.uk/dashboard/onboard')
      })
    }
}

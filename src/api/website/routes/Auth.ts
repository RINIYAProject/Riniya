import passport from 'passport'
import AbstractWebRoutes from '../../Server/AbstractWebRoutes'

export default class Auth extends AbstractWebRoutes {
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

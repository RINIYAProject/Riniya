import { CustomRequest } from '../index'
import AbstractWebRoutes from '../../Server/AbstractWebRoutes'

export default class Index extends AbstractWebRoutes {
  async register () {
    this.router.get('/', function (req, res) {

        res.cookie('session', {
          logged: false
        }, {
          maxAge: 1000 * 60 * 5,
          signed: true
        });

        res.render('index', {
            title: 'RINIYA',
            isLogged: req.isAuthenticated()
        })
    });

    this.router.get('/commands', function (req: CustomRequest, res) {
        res.render('commands', {
          title: 'RINIYA - Commands',
          isLogged: req.isAuthenticated()
        });
    });
  }
}

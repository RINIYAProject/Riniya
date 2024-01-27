import { CustomRequest } from '../index'
import { isNull } from '@riniya.ts/types'
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
            isLogged: (!isNull(req.signedCookies['session']))
        })
    });

    this.router.get('/commands', function (req: CustomRequest, res) {
        res.render('commands', {
          title: 'RINIYA - Commands',
          isLogged: (!isNull(req.signedCookies['session']))
        });
    });
  }
}

import { CustomRequest } from '../index'
import AbstractWebRoutes from '../../Server/AbstractWebRoutes'
import { Express } from 'express'

export default class Index extends AbstractWebRoutes {
  async register (app: Express) {
    app.get('/', function (req, res) {

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

    app.get('/commands', function (req: CustomRequest, res) {
        res.render('commands', {
          title: 'RINIYA - Commands',
          isLogged: req.isAuthenticated()
        });
    });
  }
}

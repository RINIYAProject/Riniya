import { Express, Request } from 'express'
import { IUser } from '../passport'
import AbstractWebRoutes from '../../Server/AbstractWebRoutes'
import { isUserLogged } from '../utils/Middleware'

export default class Shop extends AbstractWebRoutes {
  async register (app: Express) {
    app.get('/shop', isUserLogged, function (req: Request, res) {
      res.render('shop/index', {
        user: (req.user as IUser)
      })
    })

    app.post('/shop/confirm', isUserLogged, function (req: Request, res) {

    })
  }
}

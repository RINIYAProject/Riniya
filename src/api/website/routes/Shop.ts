import { Request } from "express"
import { IUser } from '../passport'
import AbstractWebRoutes from '../../Server/AbstractWebRoutes'
import { isUserLogged } from '../utils/Middleware'

export default class Shop extends AbstractWebRoutes {
  async register () {
    this.prefix = 'shop'

    this.router.get('/', isUserLogged, function (req: Request, res) {
      res.render('shop/index', {
        user: (req.user as IUser)
      })
    })

    this.router.post('/confirm', isUserLogged, function (req: Request, res) {

    })
  }
}

import { Request } from "express"
import { IUser } from '../passport'
import CAuthMiddleware from '../middleware/CAuthMiddleware'
import AbstractWebRoutes from '../../Server/AbstractWebRoutes'

export default class Shop extends AbstractWebRoutes {
  async register () {
    this.prefix = 'shop'

    this.router.get('/', new CAuthMiddleware().handle, function (req: Request, res) {
      res.render('shop/index', {
        user: (req.user as IUser)
      })
    })

    this.router.post('/confirm', new CAuthMiddleware().handle, function (req: Request, res) {

    })
  }
}

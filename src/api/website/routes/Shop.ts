import AbstractRoutes from '../../Server/AbstractRoutes'
import { Request } from "express"
import { IUser } from '../passport'

export default class Shop extends AbstractRoutes {
  async register () {
    this.router.get('/', function (req: Request, res) {
      res.render('shop', {
        user: (req.user as IUser)
      })
    })
  }
}

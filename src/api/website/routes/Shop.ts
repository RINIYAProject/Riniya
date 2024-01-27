import AbstractRoutes from '../../Server/AbstractRoutes'
import { CustomRequest } from '../index'

export default class Shop extends AbstractRoutes {
  async register () {
    this.router.get('/', function (req: CustomRequest, res) {
      // @ts-ignore
      const user = req.session.user

      res.render('shop', {
        user: user
      })
    })
  }
}

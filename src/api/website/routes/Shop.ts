import AbstractRoutes from '../../Server/AbstractRoutes'
import { CustomRequest } from '../index'

export default class Shop extends AbstractRoutes {
  async register () {
    this.router.get('/', function (req: CustomRequest, res) {
      res.render('shop', {
        user: req.token
      })
    })
  }
}

import AbstractRoutes from '../../Server/AbstractRoutes'
import { CustomRequest } from '../index'

export default class Dashboard extends AbstractRoutes {
  async register () {
    this.isProtected = true;

    this.router.get('/', function (req: CustomRequest, res) {
        // @ts-ignore
        const user = req.session.user

        res.render('dashboard', {
              user: user
        })
    })
  }
}

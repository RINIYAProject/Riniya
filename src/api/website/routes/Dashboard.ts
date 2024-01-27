import AbstractRoutes from '../../Server/AbstractRoutes'
import { Request } from "express"
import { IUser } from '../passport'

export default class Dashboard extends AbstractRoutes {
  async register () {
    this.isProtected = true;

    this.router.get('/', function (req: Request, res) {
        res.render('dashboard', {
              user: req.user as IUser
        })
    })
  }
}

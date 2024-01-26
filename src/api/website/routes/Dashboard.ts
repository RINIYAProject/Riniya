import AbstractRoutes from '../../Server/AbstractRoutes'

export default class Dashboard extends AbstractRoutes {
  async register () {
    this.isProtected = true;

    this.router.get('/dashboard', function (req, res) {

    })
  }
}

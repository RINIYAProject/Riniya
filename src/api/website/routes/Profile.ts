import AbstractWebRoutes from '../../Server/AbstractWebRoutes'

export default class Profile extends AbstractWebRoutes {
  async register () {
    this.prefix = 'profile'
  }
}

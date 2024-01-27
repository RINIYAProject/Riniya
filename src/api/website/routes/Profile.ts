import AbstractRoutes from '../../Server/AbstractRoutes'

export default class Profile extends AbstractRoutes {
  async register () {
    this.prefix = 'profile'
  }
}

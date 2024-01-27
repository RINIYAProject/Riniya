import AbstractWebRoutes from '../../Server/AbstractWebRoutes'

export default class Server extends AbstractWebRoutes {
  async register () {
    this.prefix = 'servers'
  }
}

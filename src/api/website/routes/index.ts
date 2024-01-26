import AbstractRoutes from '../../Server/AbstractRoutes'

export default class Index extends AbstractRoutes {
  async register () {
    this.router.get('/', function (req, res) {
        res.render('index', {
            title: 'RINIYA'
        })
    });

    this.router.post('/bot/commands', function (req, res) {
        res.render('commands', {
          title: 'RINIYA - Commands',
        });
    });
  }

}

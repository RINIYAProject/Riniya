import { Request } from "express"
import AbstractWebRoutes from '../../Server/AbstractWebRoutes'
import { isAdminLogged } from '../utils/Middleware'

export default class Admin extends AbstractWebRoutes {
  async register () {

    this.prefix = 'admin'

    this.router.get('/', isAdminLogged, function (req: Request, res) {

    })

    // Guilds

    this.router.get('/servers', isAdminLogged, function (req: Request, res) {

    })

    this.router.get('/servers/:guild/edit', isAdminLogged, function (req: Request, res) {

    })

    this.router.post('/servers/:guild/edit/callback', isAdminLogged, function (req: Request, res) {

    })

    // Users

    this.router.get('/users', isAdminLogged, function (req: Request, res) {

    })

    this.router.get('/users/:user/edit', isAdminLogged, function (req: Request, res) {

    })

    this.router.post('/users/:user/edit/callback', isAdminLogged,  function (req: Request, res) {

    })

    // Messages

    this.router.get('/messages', isAdminLogged, function (req: Request, res) {

    })

    this.router.get('/messages/:message/edit', isAdminLogged, function (req: Request, res) {

    })

    this.router.post('/messages/:message/edit/callback', isAdminLogged, function (req: Request, res) {

    })

    // LOGIN

    this.router.get('/login', function (req: Request, res) {
       return res.render('admin/views/auth/login')
    })

    this.router.post('/login/callback', function (req: Request, res) {

    })

    this.router.get('/logout', function (req: Request, res) {

    })

    this.router.post('/login/mfa', function (req: Request, res) {

    })

    this.router.get('/login/password-recovery', function (req: Request, res) {
        return res.render('admin/views/auth/password-recovery')
    })

    this.router.post('/login/recovery', function (req: Request, res) {

    })
  }
}

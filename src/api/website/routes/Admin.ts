import { Express, Request } from 'express'
import AbstractWebRoutes from '../../Server/AbstractWebRoutes'
import { isAdminLogged } from '../utils/Middleware'

export default class Admin extends AbstractWebRoutes {
  async register (app: Express) {

    app.get('/admin', isAdminLogged, function (req: Request, res) {

    })

    // Guilds

    app.get('/admin/servers', isAdminLogged, function (req: Request, res) {

    })

    app.get('/admin/servers/:guild/edit', isAdminLogged, function (req: Request, res) {

    })

    app.post('/admin/servers/:guild/edit/callback', isAdminLogged, function (req: Request, res) {

    })

    // Users

    app.get('/admin/users', isAdminLogged, function (req: Request, res) {

    })

    app.get('/admin/users/:user/edit', isAdminLogged, function (req: Request, res) {

    })

    app.post('/admin/users/:user/edit/callback', isAdminLogged,  function (req: Request, res) {

    })

    // Messages

    app.get('/admin/messages', isAdminLogged, function (req: Request, res) {

    })

    app.get('/admin/messages/:message/edit', isAdminLogged, function (req: Request, res) {

    })

    app.post('/admin/messages/:message/edit/callback', isAdminLogged, function (req: Request, res) {

    })

    // LOGIN

    app.get('/admin/login', function (req: Request, res) {
       return res.render('admin/views/auth/login')
    })

    app.post('/admin/login/callback', function (req: Request, res) {

    })

    app.get('/admin/logout', function (req: Request, res) {

    })

    app.post('/admin/login/mfa', function (req: Request, res) {

    })

    app.get('/admin/login/password-recovery', function (req: Request, res) {
        return res.render('admin/views/auth/password-recovery')
    })

    app.post('/admin/login/recovery', function (req: Request, res) {

    })
  }
}

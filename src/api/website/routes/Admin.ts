import { Request } from "express"
import CAdminAuthentication from '../middleware/CAdminAuthentication'
import AbstractWebRoutes from '../../Server/AbstractWebRoutes'

export default class Admin extends AbstractWebRoutes {
  async register () {
    this.router.get('/', new CAdminAuthentication().handle, function (req: Request, res) {

    })

    // Guilds

    this.router.get('/servers', new CAdminAuthentication().handle, function (req: Request, res) {

    })

    this.router.get('/servers/:guild/edit', new CAdminAuthentication().handle, function (req: Request, res) {

    })

    this.router.post('/servers/:guild/edit/callback', new CAdminAuthentication().handle, function (req: Request, res) {

    })

    // Users

    this.router.get('/users', new CAdminAuthentication().handle, function (req: Request, res) {

    })

    this.router.get('/users/:user/edit', new CAdminAuthentication().handle, function (req: Request, res) {

    })

    this.router.post('/users/:user/edit/callback', new CAdminAuthentication().handle,  function (req: Request, res) {

    })

    // Messages

    this.router.get('/messages', new CAdminAuthentication().handle, function (req: Request, res) {

    })

    this.router.get('/messages/:message/edit', new CAdminAuthentication().handle, function (req: Request, res) {

    })

    this.router.post('/messages/:message/edit/callback', new CAdminAuthentication().handle, function (req: Request, res) {

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

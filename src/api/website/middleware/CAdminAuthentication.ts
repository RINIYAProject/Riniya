import BaseMiddleware from "../../Server/BaseMiddleware";
import { Request } from "express"
import Admin from '@riniya.ts/database/Security/Admin'
import { isNull } from '@riniya.ts/types'

export default class CAdminAuthentication extends BaseMiddleware {
  public constructor() {
    super("ClientAdminAuthentication", "Authentication middleware for administrator")
  }
  public async handle(request, response, next) {
    if (request.isAuthenticated()) {

      const account = await Admin.findOne({ userId: request.user.admin.id })
      if (isNull(account)) {
        return response.render('dashboard/views/errors/403')
      }

      next()
    } else {
      return response.redirect("https://www.riniya.uk/admin/login")
    }
  }
}

import { Response, Request, NextFunction } from 'express'
import { isNull } from '@riniya.ts/types'
import Admin, { Admin as IAdm } from '@riniya.ts/database/Security/Admin'
import { IUser } from '../passport'

export interface IAdmin extends IUser {
   admin?: IAdm;
}

export function isUserLogged(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next()
  } else {
    return res.redirect("https://www.riniya.uk/user/login")
  }
}

export async function isAdminLogged(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {

    const adm = req.user as IAdmin;

    const account = await Admin.findOne({ userId: adm.admin.userId })
    if (isNull(account)) {
      return res.render('dashboard/views/errors/403')
    }

    next()
  } else {
    return res.redirect("https://www.riniya.uk/admin/login")
  }
}

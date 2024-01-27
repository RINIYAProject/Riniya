import BaseMiddleware from "../../Server/BaseMiddleware";
import { CustomRequest, CustomResponse } from '../index'

export default class CAuthMiddleware extends BaseMiddleware {
    public constructor() {
        super("ClientAuthentication", "Authentication middleware for the website")
    }
    public async handle(request: CustomRequest, response: CustomResponse, next) {
      if (request.isAuthenticated()) {
        next()
      } else {
        return response.redirect("https://www.riniya.uk/user/login")
      }
    }
}

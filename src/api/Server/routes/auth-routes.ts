import { isNull } from "@riniya.ts/types";
import AbstractRoutes from "../AbstractRoutes";

export default class AuthRoutes extends AbstractRoutes {

    public register() {
       this.router.post("/login", async (req, res) => {
            var username: String = req.body.username
            var password: String = req.body.password

            if (isNull(username) || isNull(password)) {
                return res.status(403).json({
                    status: false,
                    error: "INVALID_PASSWORD_OR_USERNAME",
                    message: "The password or username is not valid."
                })
            }

            
       })
    }
}
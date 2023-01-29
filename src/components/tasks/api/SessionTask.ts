import BaseTask from "@riniya.ts/components/BaseTask";
import Session from "@riniya.ts/database/Security/Session";

export default class SessionTask extends BaseTask {

    private DATE_NOW: number = Date.now()

    public constructor() {
        super("SessionTask", "Managing the session expiration.", "* 60 * * *",
            async () => {
                this.instance.logger.info(this.name + '@' + this.description + ': Job started.');
                (await Session.find({ sessionExpired: false })).forEach((session) => {
                    if (this.DATE_NOW >= session.sessionExpiry) {
                        this.instance.logger.warn(`Session ${session.accessToken} expired. Terminating session.`)
                        Session.updateOne({ _id: session._id }, { sessionExpired: true }, {})
                    }
                });
                this.instance.logger.info(this.name + '@' + this.description + ': Job finished.');
            })
    }
}
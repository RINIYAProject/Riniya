import ServerBuilder from "@riniya.ts/utils/ServerBuilder";
import BaseServer from "@riniya.ts/server/BaseServer";
import FetchGuild from "./controllers/guild/FetchGuild";

export default class DataServer extends BaseServer {

    public constructor() {
        super(new ServerBuilder("data", "v1", "R09"));
    }

    public handler(): void {
        //this.registerRoute(new FetchGuild());
    }
}
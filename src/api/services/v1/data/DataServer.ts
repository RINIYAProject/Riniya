import ServerBuilder from "../../../../utils/ServerBuilder";
import BaseServer from "../../../../abstracts/server/BaseServer";
import FetchGuild from "./controllers/guild/FetchGuild";

export default class DataServer extends BaseServer {

    public constructor() {
        super(new ServerBuilder("data", "v1", "R09"));
    }

    public handler(): void {
        //this.registerRoute(new FetchGuild());
    }
}
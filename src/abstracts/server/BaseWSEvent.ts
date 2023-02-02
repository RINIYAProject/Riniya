import Base from "../Base";

export default abstract class BaseWSEvent extends Base {
    public constructor(name: string, route: string, listener: Function) {
        super(name, "", "EVENT");

        this.instance
            .serverManager
            .websocket.io.of(route).on(
                this.name,
                listener.bind(this.instance)
            )
    }
}
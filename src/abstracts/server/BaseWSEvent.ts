import Base from "../Base";

export default abstract class BaseWSEvent extends Base {
    public constructor(name: string, listener: Function) {
        super(name, "", "EVENT");

        this.instance
            .serverManager
            .websocket.io.on(
                this.name,
                listener.bind(this.instance)
            )
    }
}
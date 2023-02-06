import Base from "../Base";

export default abstract class BaseWSEvent extends Base {
    public constructor(name: string, route: string, listener: Function) {
        super(name, "", "EVENT");
    }
}
import Riniya from "@riniya.ts";
import BaseTask from "@riniya.ts/components/BaseTask";
import OptionMap from "@riniya.ts/utils/OptionMap";
import SessionTask from "./api/SessionTask";
import KeepAlive from "./api/KeepAlive";
import VerificationTask from "./api/VerificationTask";
import GuildResync from './api/GuildResync'

export default class TasksManager {
    private TASKS: OptionMap<string, BaseTask>

    public constructor() {
        this.TASKS = new OptionMap<string, BaseTask>()
    }

    public registerAll(): void {
        this.register(new SessionTask())
        this.register(new KeepAlive())
        this.register(new GuildResync())
        //this.register(new VerificationTask())
    }

    private register(task: BaseTask): void {
        Riniya.instance.logger.info(`TASK : ${task.name}@${task.description} : (${task.type}) Registered.`)
        this.TASKS.add(task.name, task)
    }
}

import Riniya from "@riniya.ts";

export default class InitChecker {
    public init(): boolean {
        if (this.unset("TOKEN"))
            return this.print("TOKEN")
        else if (this.unset("MONGODB"))
            return this.print("MONGODB")
        else if (this.unset("SERVER_KEY"))
            return this.print("SERVER_KEY")
        else if (this.unset("SERVER_CERT"))
            return this.print("SERVER_CERT")
        return false
    }

    private unset(key: string): boolean {
        return process.env[key].length < 1
    }

    private print(type: string): boolean {
        Riniya.instance.logger.error("-------------------------------------------")
        Riniya.instance.logger.error(" -> InitChecker failed at '" + type + "'.  ")
        Riniya.instance.logger.error("   -> Please check your environement file. ")
        Riniya.instance.logger.error("   -> Restart is required to continue.     ")
        Riniya.instance.logger.error("-------------------------------------------")
        return true;
    }
}
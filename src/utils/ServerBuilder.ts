export default class ServerBuilder {
    private readonly version: string;
    private readonly name: string;
    private readonly revision: string;

    public constructor(version: string, name: string, revision?: string) {
        this.version = version;
        this.name = name;
        this.revision = revision || 'R01';
    }

    public getVersion(): string {
        return this.version;
    }

    public getName(): string {
        return this.name;
    }

    public getRevision(): string {
        return this.revision;
    }
}
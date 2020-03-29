export class RuntimeInformation {
    runtimeName: string;
    feature: number

    constructor(runtimeName: string, feature: number) {
        this.runtimeName = runtimeName
        this.feature = feature
    }
}

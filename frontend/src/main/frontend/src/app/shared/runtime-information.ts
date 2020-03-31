export class RuntimeInformation {
    runtimeName: string;
    feature: number;
    formattedBuildTime: string;

    constructor(runtimeName: string, feature: number, formattedBuildTime: string) {
        this.runtimeName = runtimeName
        this.feature = feature
        this.formattedBuildTime = formattedBuildTime
    }
}

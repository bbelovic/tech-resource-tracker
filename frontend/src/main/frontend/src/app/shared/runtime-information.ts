export class RuntimeInformation {
    vendorName: string;
    feature: number

    constructor(vendorName: string, feature: number) {
        this.vendorName = vendorName
        this.feature = feature
    }
}

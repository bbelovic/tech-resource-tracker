import { Observable } from 'rxjs';

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

export function runtimeInformationObservable(): Observable<RuntimeInformation> {
    return new Observable<RuntimeInformation>(
      s => s.next(new RuntimeInformation('Dummy vendor', 50, '1-1-2020 @ 15:30')));
}

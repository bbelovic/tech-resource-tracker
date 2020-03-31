import { RuntimeInformation } from './runtime-information'
import { Observable } from 'rxjs'

export class RuntimeInformationServiceStub {
    getRuntimeInformation(): Observable<RuntimeInformation> {
        return new Observable(obs => {
            obs.next(new RuntimeInformation('Dummy vendor', 50, '1-1-2020 @ 15:30'))
            obs.complete()
          })
    }
}

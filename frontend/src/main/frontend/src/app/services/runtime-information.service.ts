import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RuntimeInformation } from 'app/shared/runtime-information';

@Injectable({
  providedIn: 'root'
})
export class RuntimeInformationService {

  constructor(private httpClient: HttpClient) { }

  getRuntimeInformation(): Observable<RuntimeInformation> {
    return this.httpClient.get<RuntimeInformation>('/runtime');
  }
}

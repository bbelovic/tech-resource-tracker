import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRegistration } from 'app/shared/user-registration';
import { Observable } from 'rxjs';
import { RegistrationResponse } from 'app/shared/registration-response';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private httpClient: HttpClient) { }

  registerNewUser(userRegistration: UserRegistration): Observable<RegistrationResponse> {
    const httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    return this.httpClient.post<RegistrationResponse>('/register', userRegistration, httpHeaders)
  }
}

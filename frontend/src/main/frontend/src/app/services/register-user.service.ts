import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserRegistration } from 'app/shared/user-registration';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegistrationResponse } from 'app/shared/registration-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  private readonly registrationEndpoint = `${environment.apiUrl}/register`
  constructor(private httpClient: HttpClient) { }

  registerNewUser(userRegistration: UserRegistration): Observable<RegistrationResponse> {
    const httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    return this.httpClient.post<RegistrationResponse>(this.registrationEndpoint, userRegistration, httpHeaders)
      .pipe(catchError(err => of(this.genericFailedResponse())));
  }

  private genericFailedResponse() {
      const failedResponse = new RegistrationResponse()
      failedResponse.error = true;
      failedResponse.resultMessage = 'User registration failed';
      return failedResponse;
  }

}

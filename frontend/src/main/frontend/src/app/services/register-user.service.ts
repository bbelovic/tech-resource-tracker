import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from 'app/shared/user-registration';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(httpClient: HttpClient) { }

  registerNewUser(userRegistration: UserRegistration) {
    const user = new UserRegistration('', '', '');


  }
}

import { TestBed } from '@angular/core/testing';

import { RegisterUserService } from './register-user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from 'app/shared/user-registration';
import { of } from 'rxjs';
import { RegistrationResponse } from 'app/shared/registration-response';

describe('RegisterUserService', () => {
  let httpClient: HttpClient;
  let httpClientController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
      httpClient = TestBed.inject(HttpClient);
      httpClientController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const service: RegisterUserService = TestBed.get(RegisterUserService);
    expect(service).toBeTruthy();
  });

  it('should respond with generic failed registration message, when registration fails', () => {
    const req = httpClientController.expectOne('/register')
    const service: RegisterUserService = TestBed.get(RegisterUserService);
    const actual = service.registerNewUser(new UserRegistration('jdoe', 'a', 'x'))


    expect(actual).toEqual(this.failedRegistrationResponse())
    req.flush('error', {status: 404, statusText: 'Bad request'})
  })

  function failedRegistrationResponse() {
    of(new RegistrationResponse())
  }
});

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
      imports: [HttpClientTestingModule], providers: [RegisterUserService]
    })
      httpClient = TestBed.inject(HttpClient);
      httpClientController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const service: RegisterUserService = TestBed.get(RegisterUserService);
    expect(service).toBeTruthy();
  });

  it('should respond with generic failed registration message, when registration fails', () => {

    const service: RegisterUserService = TestBed.inject(RegisterUserService);
    const actual = service.registerNewUser(new UserRegistration('jdoe', 'a', 'x'))
    actual.subscribe(res => {
      expect(res.error).toBeTrue()
      expect(res.resultMessage).toEqual('User registration failed')
    });

    const req = httpClientController.expectOne('/register')

    req.flush('error', {status: 404, statusText: 'Bad request'})
  })

  function failedRegistrationResponse() {
    return of(new RegistrationResponse())
  }
});

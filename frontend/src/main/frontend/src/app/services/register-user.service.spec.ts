import { TestBed } from '@angular/core/testing';

import { RegisterUserService } from './register-user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from 'app/shared/user-registration';
import { environment } from '../../environments/environment';

describe('RegisterUserService', () => {
  const url = environment.apiUrl;
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

  const testParameters = [
    {description: 'should respond with success registration response, when registration succeeds',
      registration: new UserRegistration('jdoe', 'secret', 'secret'),
      response: {error: false, resultMessage: 'New user [jdoe] registered.'},
      statusDetails: {status: 201, statusText: 'Created'} },
    {description: 'should respond with failed registration response, when registration fails',
    registration: new UserRegistration('jdoe', 'a', 'x'),
      response: {error: false, resultMessage: 'User registration failed',
      statusDetails: {status: 400, statusText: 'Bad request'}}
  }

  ];

  testParameters.forEach((x) => {
    it(x.description, () => {
      const service: RegisterUserService = TestBed.inject(RegisterUserService);
    const actual = service.registerNewUser(x.registration)
    actual.subscribe(res => {
      expect(res.error).toEqual(x.response.error)
      expect(res.resultMessage).toEqual(x.response.resultMessage)
    });
    const req = httpClientController.expectOne(url + '/register')

    req.flush(x.response, x.statusDetails)
    })
  })
});

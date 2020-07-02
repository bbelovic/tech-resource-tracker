import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let httpClient: HttpClient;
  let httpClientController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule], providers: [AuthenticationService]
          })
            httpClient = TestBed.inject(HttpClient);
            httpClientController = TestBed.inject(HttpTestingController);
    })

    it('should be created', () => {
        const service = TestBed.get(AuthenticationService);
        expect(service).toBeTruthy();
    })
})

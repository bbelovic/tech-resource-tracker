import { TestBed } from '@angular/core/testing';

import { RuntimeInformationService } from './runtime-information.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RuntimeInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [RuntimeInformationService]
  }));

  it('should be created', () => {
    const service: RuntimeInformationService = TestBed.inject(RuntimeInformationService);
    expect(service).toBeTruthy();
  });
});

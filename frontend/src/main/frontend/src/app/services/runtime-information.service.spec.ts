import { TestBed } from '@angular/core/testing';

import { RuntimeInformationService } from './runtime-information.service';

describe('RuntimeInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RuntimeInformationService]
  }));

  it('should be created', () => {
    const service: RuntimeInformationService = TestBed.inject(RuntimeInformationService);
    expect(service).toBeTruthy();
  });
});

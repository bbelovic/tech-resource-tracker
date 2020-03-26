import { TestBed } from '@angular/core/testing';

import { RuntimeInformationService } from './runtime-information.service';

describe('RuntimeInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuntimeInformationService = TestBed.get(RuntimeInformationService);
    expect(service).toBeTruthy();
  });
});

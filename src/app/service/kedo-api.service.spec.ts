import { TestBed } from '@angular/core/testing';

import { KedoApiService } from './kedo-api.service';

describe('KedoApiService', () => {
  let service: KedoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KedoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

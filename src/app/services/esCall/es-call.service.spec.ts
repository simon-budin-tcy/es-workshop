import { TestBed } from '@angular/core/testing';

import { EsCallService } from './es-call.service';

describe('EsCallService', () => {
  let service: EsCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MinistorageService } from './ministorage.service';

describe('MinistorageService', () => {
  let service: MinistorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinistorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PoojaService } from '../pooja.service';

describe('PoojaService', () => {
  let service: PoojaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoojaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

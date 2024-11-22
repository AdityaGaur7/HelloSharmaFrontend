import { TestBed } from '@angular/core/testing';

import { AstroStoreService } from './astrostore.service';
import { AstroStore } from '../models/astro-store.model';
describe('AstrostoreService', () => {
  let service: AstroStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstroStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

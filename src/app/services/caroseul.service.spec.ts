import { TestBed } from '@angular/core/testing';

import { CaroseulService } from './caroseul.service';

describe('CaroseulService', () => {
  let service: CaroseulService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaroseulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

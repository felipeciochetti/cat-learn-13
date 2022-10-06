import { TestBed } from '@angular/core/testing';

import { CustomerCoursesService } from './customer-courses.service';

describe('CustomerCoursesService', () => {
  let service: CustomerCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

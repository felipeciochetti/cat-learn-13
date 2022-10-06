import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCoursesDetailsComponent } from './customer-courses-details.component';

describe('CustomerCoursesDetailsComponent', () => {
  let component: CustomerCoursesDetailsComponent;
  let fixture: ComponentFixture<CustomerCoursesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCoursesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCoursesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

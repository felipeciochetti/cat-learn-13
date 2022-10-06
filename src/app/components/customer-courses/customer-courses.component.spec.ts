import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCoursesComponent } from './customer-courses.component';

describe('CustomerCoursesComponent', () => {
  let component: CustomerCoursesComponent;
  let fixture: ComponentFixture<CustomerCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

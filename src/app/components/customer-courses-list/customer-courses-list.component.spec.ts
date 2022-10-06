import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCoursesListComponent } from './customer-courses-list.component';

describe('CustomerCoursesListComponent', () => {
  let component: CustomerCoursesListComponent;
  let fixture: ComponentFixture<CustomerCoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCoursesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

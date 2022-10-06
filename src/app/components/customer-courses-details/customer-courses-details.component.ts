import { Component, OnInit } from '@angular/core';
import { getCurrentUser } from 'src/app/shared/utils';

@Component({
  selector: 'app-customer-courses-details',
  templateUrl: './customer-courses-details.component.html',
  styleUrls: ['./customer-courses-details.component.css'],
})
export class CustomerCoursesDetailsComponent implements OnInit {
  currentUser: any;
  constructor() {}

  ngOnInit(): void {
    this.currentUser = getCurrentUser();

    console.log(this.currentUser);
  }
}

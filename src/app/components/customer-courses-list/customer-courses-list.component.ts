import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course';
import { CaroseulService } from 'src/app/services/caroseul.service';
import { CourseService } from 'src/app/services/course.service';
import { CustomerCoursesService } from 'src/app/services/customer-courses.service';
import { UrlsService } from 'src/app/services/urls.service';
import { getCurrentUser } from 'src/app/shared/utils';

@Component({
  selector: 'app-customer-courses-list',
  templateUrl: './customer-courses-list.component.html',
  styleUrls: ['./customer-courses-list.component.css'],
})
export class CustomerCoursesListComponent implements OnInit {
  courses: Course[];
  user = {};
  constructor(
    private couserService: CustomerCoursesService,
    private route: ActivatedRoute,
    private urlService: UrlsService,
    private caroseulService: CaroseulService
  ) {}

  ngOnInit(): void {
    this.user = getCurrentUser();

    this.route.paramMap.subscribe(() => {
      this.couserService.getCourseByCustomerEmail(this.user['email']);
    });
  }
}

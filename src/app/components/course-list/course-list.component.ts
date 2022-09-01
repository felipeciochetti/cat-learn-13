import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course';
import { ActivatedRoute } from '@angular/router';
import { UrlsService } from 'src/app/services/urls.service';
import { CaroseulService } from 'src/app/services/caroseul.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component copy.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: Course[];
  searchMode: boolean = false;

  customOptions: null;

  constructor(
    private couserService: CourseService,
    private route: ActivatedRoute,
    private urlService: UrlsService,
    private caroseulService: CaroseulService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getCoursesList();
    });

    this.customOptions = null;
  }

  getCoursesList() {
    this.searchMode = this.route.snapshot.paramMap.has('name');

    if (this.searchMode) {
      this.searchCourse();
    } else {
      this.getAllCourseList();
    }
  }

  getAllCourseList() {
    this.couserService.getCourseList().subscribe((data) => {
      this.courses = data;
    });

    this.couserService.getCourseList().subscribe((data) => {
      this.courses = data;
      data.forEach((obj) =>
        this.couserService
          .fetchImageCapa(obj.id)
          .subscribe((img) => this.createImageCapa(obj, img))
      );
    });
  }

  searchCourse() {
    const theKeyword: string = this.route.snapshot.paramMap.get('name');

    // now search for the products using keyword
    this.couserService.searchCourse(theKeyword).subscribe((data) => {
      this.courses = data;
    });
  }

  private createImageCapa(course: Course, image: any) {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          course.imageToShow = reader.result;
        },
        false
      );

      reader.readAsDataURL(image);
    } else {
    }
  }
}

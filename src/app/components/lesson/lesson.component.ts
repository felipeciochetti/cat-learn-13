import { CourseService } from 'src/app/services/course.service';
import { Lesson } from './../../model/lesson';
import { Component, OnInit } from '@angular/core';
import { LessonsService } from 'src/app/services/lessons.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Data } from 'src/app/model/data';
import { Course } from 'src/app/model/course';
import { Module } from 'src/app/model/module';
import { UrlsService } from 'src/app/services/urls.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from 'src/app/services/messages.service';
import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from '../confirm-dialog/confirm-dialog.component';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css'],
})
export class LessonComponent implements OnInit {
  url = '';

  course: Course = new Course();
  module: Module;
  lesson: Lesson = new Lesson();

  someSubscription: any;

  constructor(
    public lessonService: LessonsService,
    public courseService: CourseService,
    public moduleService: ModulesService,
    public navigationService: NavigationService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public messageService: MessagesService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.someSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Here is the dashing line comes in the picture.
        // You need to tell the router that, you didn't visit or load the page previously, so mark the navigated flag to false as below.
        this.router.navigated = false;
      }
    });
  }

  async ngOnInit(): Promise<void> {
    console.log('create component lesson');

    const lessonId: number = +this.route.snapshot.paramMap.get('idLesson');

    this.loadLesson(lessonId);

    //this.url = this.getContentLesson();
    //console.log('url > ' + this.url);
  }
  async loadLesson(lessonId): Promise<String> {
    return new Promise((resolve, reject) => {
      this.lessonService.getLesson(lessonId).subscribe((res) => {
        this.lesson = res;
        this.url = this.getContentLesson();
        this.moduleService.getModule(this.lesson.idModule).subscribe((res) => {
          this.module = res;
          this.courseService
            .getCourse(this.module.idCourse)
            .subscribe((res) => {
              this.course = res;
            });
        });
      });
    });
  }
  goToLesson(idLesson: number) {
    this.router.navigateByUrl('/lesson/' + idLesson);
    this.ngOnInit();
  }

  editLesson() {}

  getContentLesson() {
    return (
      this.lessonService.getContentStreamLesson() + this.lesson.id + '/stream'
    );
  }
  ngOnDestroy() {
    if (this.someSubscription) {
      this.someSubscription.unsubscribe();
    }
  }
}

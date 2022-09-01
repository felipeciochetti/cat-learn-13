import { CourseService } from 'src/app/services/course.service';
import { Lesson } from './../../model/lesson';
import { Component, OnInit } from '@angular/core';
import { LessonsService } from 'src/app/services/lessons.service';
import { ActivatedRoute } from '@angular/router';
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

  course: Course;
  module: Module;
  lesson: Lesson = new Lesson();

  constructor(
    public lessonService: LessonsService,
    public courseService: CourseService,
    public moduleService: ModulesService,
    public navigationService: NavigationService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public messageService: MessagesService
  ) {}

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
  setLessonDetail(lessonDetail: Lesson) {
    this.courseService.setLessonDetail(lessonDetail);
    this.url = this.getContentLesson();
    console.log(this.url);
    this.navigationService.navigateToLessonDetail(
      this.courseService.courseDetail.id,
      this.courseService.moduleDetail.id,
      lessonDetail.id
    );
  }

  editLesson() {}

  getContentLesson() {
    return (
      this.lessonService.getContentStreamLesson() + this.lesson.id + '/stream'
    );
  }
}

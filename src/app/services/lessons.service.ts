import { UntypedFormGroup } from '@angular/forms';
import { Lesson } from './../model/lesson';
import { ModulesService } from './../services/modules.service';
import { Injectable } from '@angular/core';
import { UrlsService } from '../services/urls.service';
import { NavigationService } from '../services/navigation.service';
import { MessagesService } from './messages.service';
import { CourseService } from '../services/course.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Module } from '../model/module';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private httpClient: HttpClient,
    private urlService: UrlsService,
    private navigationService: NavigationService,
    private courseService: CourseService,
    private moduleService: ModulesService,
    private messageService: MessagesService
  ) {}

  saveLesson(lesson: Lesson, idModule: number) {
    console.log('save ' + lesson.name);
    return this.httpClient.post(
      this.urlService.module + '/' + idModule + '/lesson',
      lesson,
      this.httpOptions
    );
  }

  updateLesson(lesson: Lesson, idModule: number) {
    console.log('update lesson');
    return this.httpClient.put(
      this.urlService.module + '/' + idModule + '/lesson/' + lesson.id,
      lesson,
      this.httpOptions
    );
  }

  deleteLesson(idLesson: number) {
    return this.httpClient.delete(
      this.urlService.lesson + '/' + idLesson,
      this.httpOptions
    );
  }

  getLesson(id: number): Observable<Lesson> {
    const lesson = this.urlService.lesson;

    return this.httpClient.get<Lesson>(lesson + '/' + id);
  }

  setDataForm(createLessonForm: UntypedFormGroup) {
    createLessonForm.patchValue(this.courseService.lessonDetail);
  }

  getContentStreamLesson() {
    return this.urlService.streamLessonUrl;
  }

  getContentPdfLesson() {
    return this.urlService.lesson;
  }
}

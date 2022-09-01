import { Course } from './../model/course';
import { Lesson } from './../model/lesson';
import { ModulesService } from 'src/app/services/modules.service';
import { Module } from './../model/module';
import { NavigationService } from './navigation.service';
import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { UrlsService } from './urls.service';
import { map, catchError, tap } from 'rxjs/operators';
import { ConstantPool, IfStmt } from '@angular/compiler';
import { MessagesService } from '../services/messages.service';
import { UploadService } from './upload.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public modules: Module[] = [];
  public courseDetail = new Course();
  public moduleDetail = new Module();
  public lessonDetail = new Lesson();

  constructor(
    private httpClient: HttpClient,
    private urlService: UrlsService,
    private navigationService: NavigationService,
    private messageService: MessagesService
  ) {}

  getCurrentCourse() {
    return this.courseDetail;
  }

  getCourseList(): Observable<Course[]> {
    // need to build URL based on category id
    const courseListUrl = this.urlService.courseListUrl;

    return this.httpClient.get<Course[]>(courseListUrl);
  }
  getCourse(id: number): Observable<Course> {
    const courseListUrl = this.urlService.courseListUrl;

    return this.httpClient.get<Course>(courseListUrl + '/' + id);
  }
  getCourseByName(name: string): Observable<Course[]> {
    const courseListUrlByName = this.urlService.searchCoursesUrl;

    return this.httpClient.get<Course[]>(courseListUrlByName, {
      params: { name },
    });
  }

  fetchImageCapa(id: number): Observable<Blob> {
    const courseListUrl = this.urlService.courseListUrl;

    return this.httpClient.get(courseListUrl + '/img/' + id, {
      responseType: 'blob',
    });
  }
  searchCourse(name: string): Observable<Course[]> {
    // need to build URL based on the keyword
    console.log('searchCourse ' + name);
    return this.getCourseByName(name);
  }

  deleteCourse(id: number): Observable<{}> {
    return this.httpClient.delete(
      this.urlService.courseListUrl + '/' + id,
      this.httpOptions
    );
    /* .pipe(catchError(this.handleError)) */
  }
  editCourse() {
    this.navigationService.navigateToCourseEdit(this.courseDetail.id);
  }

  saveCourse(course: Course) {
    console.log('save ' + course.name);
    return this.httpClient.post(
      this.urlService.courseListUrl,
      course,
      this.httpOptions
    );
  }
  updateCourse(course: Course) {
    return this.httpClient.put<Course>(
      this.urlService.courseListUrl + '/' + this.courseDetail.id,
      course,
      this.httpOptions
    );
  }
  addModuleToCourseDetail(module: Module) {
    if (this.courseDetail.modules == null) {
      this.courseDetail.modules = [];
    }
    console.log('Module add to  course');
    this.courseDetail.modules.push(module);
  }

  navigationToCourse() {
    this.navigationService.navigateToCourses();
  }

  getCourseDetail(): Course {
    return this.courseDetail;
  }
  setCourseDEtail(course: Course) {
    this.courseDetail = course;
  }

  getModuleDetail(): Module {
    return this.moduleDetail;
  }
  setModuleDEtail(module: Module) {
    this.moduleDetail = module;
  }

  getLessonDetail(): Lesson {
    return this.lessonDetail;
  }

  setLessonDetail(lesson: Lesson) {
    this.lessonDetail = lesson;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);

      this.messageService.add(error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );

      this.messageService.add(error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}

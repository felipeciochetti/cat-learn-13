import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UrlsService {
  private urlServer = 'http://localhost:8080/';
  //private urlServer = 'http://www.catsys.com.br/cbg/';

  private course = 'courses';

  //private urlServer = '';
  public courseListUrl = this.urlServer + this.course;

  public module = this.urlServer + 'module';

  public lesson = this.urlServer + 'lesson';

  public searchCoursesUrl = this.urlServer + 'courses/search';

  public streamLessonUrl = this.urlServer + 'lesson/';

  public pdfLessonUrl = this.urlServer + 'lesson/pdf/';

  public uploadImageCourse = this.urlServer + 'course/img/';

  public uploadContentLesson = this.urlServer + 'lesson/';

  public imageLogo = 'assets/images/logo/header-logo.jpg';

  constructor() {}
}

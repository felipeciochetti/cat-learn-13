import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {
  private urlServer = 'http://localhost:8080/';
  //private urlServer = 'http://www.catsys.com.br/cbg/';


  private  course = 'courses';


  //private urlServer = '';
  public courseListUrl = this.urlServer + this.course;

  
  public module = this.urlServer + 'module';

  public lesson = this.urlServer + 'api/lesson';

  public searchCoursesUrl = this.urlServer + 'courses/search';

  public streamLessonUrl = this.urlServer + 'api/stream/stream/';

  public pdfLessonUrl = this.urlServer + 'api/lesson/pdfLesson/';


  public uploadImageCourse = this.urlServer + this.course + '/course-img';

  public uploadContentLesson = this.urlServer + 'api/upload/lessonfile';

  public imageLogo = 'assets/images/logo/header-logo.jpg';

  constructor() {}


  public getUrlImageCapa(id:number){
    return this.courseListUrl +'/' + id + '/imageCapa';
  }
}

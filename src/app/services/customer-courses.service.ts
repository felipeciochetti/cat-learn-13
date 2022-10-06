import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { MessagesService } from './messages.service';
import { NavigationService } from './navigation.service';
import { UrlsService } from './urls.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerCoursesService {
  constructor(
    private httpClient: HttpClient,
    private urlService: UrlsService,
    private navigationService: NavigationService,
    private messageService: MessagesService
  ) {}

  getCourseByCustomerEmail(email: string): Observable<Course> {
    const courseListUrl = this.urlService.courseCustomerUrl;
    const params = new HttpParams().set('email', email);
    return this.httpClient.get<Course>(courseListUrl + '/courses', { params });
  }
  getCourseByCustomerId(id: number): Observable<Course> {
    const courseListUrl = this.urlService.courseCustomerUrl;

    return this.httpClient.get<Course>(courseListUrl + '/' + id + 'courses');
  }
}

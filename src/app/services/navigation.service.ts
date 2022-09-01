import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateToCourses() {
    this.router.navigate(['/courses']);
  }

  navigateToCourseDetail(id: number) {
    this.router.navigate(['/courses/' + id]);
  }
  navigateToModuleDetail(idCourse: number, idModule: number) {
    this.router.navigate(['/module/' + idCourse + '/' + idModule]);
  }
  navigateToModuleList(idCourse: number) {
    this.router.navigate(['course/' + idCourse + '/modules']);
  }
  navigateToLessonDetail(idCourse: number, idModule: number, idLesson: number) {
    this.router.navigate([
      '/lesson/' + idCourse + '/' + idModule + '/' + idLesson,
    ]);
  }
  navigateToLessonEdit(idCourse: number, idModule: number, idLesson: number) {
    this.router.navigate([
      '/edit-lesson/' + idCourse + '/' + idModule + '/' + idLesson,
    ]);
  }
  navigateToModuleEdit(idCourse: number, idModule: number) {
    this.router.navigate(['/edit-module/' + idCourse + '/' + idModule]);
  }
  navigateToCourseEdit(id: number) {
    this.router.navigate(['/edit-course/' + id]);
  }
  navigateToSearchCourse(name: string) {
    this.router.navigate(['course/search/' + name]);
  }
}

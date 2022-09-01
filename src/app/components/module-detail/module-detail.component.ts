import { ModulesService } from './../../services/modules.service';
import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/model/module';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from 'src/app/services/messages.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { LessonsService } from 'src/app/services/lessons.service';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css'],
})
export class ModuleDetailComponent implements OnInit {
  constructor(
    public courseService: CourseService,
    public moduleService: ModulesService,
    public lessonService: LessonsService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    public dialog: MatDialog,
    public messageService: MessagesService
  ) {}

  options = {
    autoClose: false,
    keepAfterRouteChange: false,
  };

  course: Course = new Course();

  modules: Module[] = [];

  courseId: number;

  ngOnInit(): void {
    this.handleModuleDetails();
  }

  handleModuleDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    this.courseId = +this.route.snapshot.paramMap.get('idCourse');

    this.moduleService.getModuleList(this.courseId).subscribe((res) => {
      this.modules = res;
      this.sortedModules();
    });
    this.courseService.getCourse(this.courseId).subscribe((res) => {
      this.course = res;
    });
  }

  sortedModules(): Module[] {
    try {
      this.modules.sort((a, b) => a.number.localeCompare(b.number));
    } catch {}
    return this.modules;
  }

  confirmDialogDelete(courseId: number, moduleId: number): void {
    const message = `Deseja deletar o Modulo?`;

    const dialogData = new ConfirmDialogModel('Confirmar', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteModule(courseId, moduleId);
        console.log('');
      }
    });
  }

  deleteModule(courseId: number, moduleId: number) {
    this.moduleService.deleteModule(courseId, moduleId).subscribe(
      (res) => {
        this.handleModuleDetails();
        this.messageService.success('Deletado com Sucesso', this.options);
      },
      (error) => {
        this.messageService.error(error.error, this.options);
        console.log(error);
      }
    );
  }

  confirmDialogCourseDelete(): void {
    const message = `Deseja deletar o curso?`;

    const dialogData = new ConfirmDialogModel('Confirmar', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteCourse();
        console.log('');
      }
    });
  }

  deleteCourse() {
    this.courseService.deleteCourse(this.course.id).subscribe(
      (res) => {
        this.messageService.success('Deletado com Sucesso', this.options);
        this.navigationService.navigateToCourses();
      },
      (error) => {
        this.messageService.error(error.error, this.options);
        console.log(error);
      }
    );
  }

  confirmDialogLessonDelete(lessonId: number): void {
    const message = `Deseja deletar a Licao?`;

    const dialogData = new ConfirmDialogModel('Confirmar', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteLesson(lessonId);
      }
    });
  }

  deleteLesson(lessonId: number) {
    this.lessonService.deleteLesson(lessonId).subscribe(
      (res) => {
        this.handleModuleDetails();
        this.messageService.success('Deletado com Sucesso', this.options);
      },
      (error) => {
        this.messageService.error(error.error, this.options);
        console.log(error);
      }
    );
  }
}

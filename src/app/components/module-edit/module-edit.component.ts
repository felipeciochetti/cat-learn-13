import { NavigationService } from 'src/app/services/navigation.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Module } from 'src/app/model/module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModulesService } from 'src/app/services/modules.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog
} from '@angular/material/dialog';
import { CreateModulesComponent } from '../create-modules/create-modules.component';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/model/course';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from 'src/app/model/lesson';
import { MessagesService } from 'src/app/services/messages.service';
import {
  ConfirmDialogModel,
  ConfirmDialogComponent
} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.css']
})
export class ModuleEditComponent implements OnInit {
  constructor(
    public courseService: CourseService,
    public modulesService: ModulesService,
    public navigationService: NavigationService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public messageService: MessagesService
  ) {}

  ngOnInit(): void {
    const theCourseId: number = +this.route.snapshot.paramMap.get('idCourse');
    const theModuleId: number = +this.route.snapshot.paramMap.get('idModule');

    
  }

  setLessonDetail(lessonDetail: Lesson) {
    this.courseService.setLessonDetail(lessonDetail);
    this.navigationService.navigateToLessonDetail(
      this.courseService.courseDetail.id,
      this.courseService.moduleDetail.id,
      lessonDetail.id
    );
  }

  
  confirmDialogDelete(): void {
    const message = `Deseja deletar a Modulo?`;

    const dialogData = new ConfirmDialogModel('Confirmar', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteModule();
      }
    });
  }
  
  deleteModule() {
    this.modulesService.deleteModule(0,0).subscribe(
      res => {
        this.messageService.success('Deletado com Sucesso', null);
        this.navigationService.navigateToCourses();
      },
      error => {
        this.messageService.error(error.error, null);
        console.log(error);
      }
    );
  }


  sortedLessons(): Lesson[] {
    this.courseService.moduleDetail.lessons.sort((a,b) => a.number.localeCompare(b.number));
    return this.courseService.moduleDetail.lessons;
  }
  
  public getUrlImageCapa(id:number){
    return this.courseService.getUrlImageCapa(id);
  }

  
}

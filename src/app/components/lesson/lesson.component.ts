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
  ConfirmDialogComponent
} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

url = '';

  constructor(
    public lessonService: LessonsService,
    public courseService: CourseService,
    public navigationService: NavigationService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public messageService: MessagesService
  ) {}

  ngOnInit(): void {

    console.log("create component lesson");
    const theCourseId: number = +this.route.snapshot.paramMap.get('idCourse');
    
       this.url = this.getContentLesson();
    console.log(this.url);
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

  editLesson() {
   
  }

  confirmDialogDelete(): void {
    const message = `Deseja deletar a Licao?`;

    const dialogData = new ConfirmDialogModel('Confirmar', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteLesson();
        console.log('');
      }
    });
  }
  deleteLesson() {
    this.lessonService.deleteLesson(1,1).subscribe(
      res => {
        this.messageService.success('Deletado com Sucesso', null);
        this.navigationService.navigateToCourseDetail(
          this.courseService.courseDetail.id);
      },
      error => {
        this.messageService.error(error.error, null);
        console.log(error);
      }
    );
  }

  getContentLesson(){

    if(this.courseService.lessonDetail.typeFile == ".pdf"){
      return this.lessonService.getContentPdfLesson();
      
    }else{
      return this.lessonService.getContentStreamLesson();


    }
  }

}

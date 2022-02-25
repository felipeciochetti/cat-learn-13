import { MessagesService } from 'src/app/services/messages.service';
import { UploadService } from './../../services/upload.service';
import { Lesson } from 'src/app/model/lesson';
import { LessonsService } from 'src/app/services/lessons.service';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Module } from 'src/app/model/module';
import { Course } from 'src/app/model/course';


@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {
  lesson: Lesson;
  module:Module;
  course:Course;

  idModule: number;

  isEdit = false;
  isChangeFile = false;

  selectedFiles = null;
  currentFile: File;
  progress = 0;
  message = '';

  constructor(
    private fb: FormBuilder,
    public courseService: CourseService,
    public lessonService: LessonsService,
    public navigationService: NavigationService,
    public uploadService: UploadService,
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) {}

  createLessonForm: FormGroup = this.fb.group({
    id: ['', []],
    name: ['', [Validators.required, Validators.minLength(4)]],
    number: ['', [Validators.required, Validators.minLength(1)]],
    duration: ['', [Validators.required, Validators.minLength(1)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    dateRelease: [],
    contentFilePath: [],
    createdBy: []
  });

  ngOnInit(): void {
     // check is editing...
     if (this.router.url.indexOf('edit') >= 0) {
      this.isEdit = true;
      this.createLessonForm.patchValue(history.state);
      
      
      this.route.params.subscribe(params => 
        this.idModule = Number.parseInt(params['idModule']));
    }else {
        
      this.module =  history.state;
      this.idModule = this.module.id;

    } 
  



  }

  createLesson() {
    if (!this.createLessonForm.valid) {
      return;
    }

    this.lesson = Object.assign({}, this.createLessonForm.value);

    
    this.saveNewLesson();
    

  }

  selectFile(event): void {
    this.selectedFiles = event.target.files[0];
    this.isChangeFile = true;
  }

  upload(codeLesson: string): void {
    this.progress = 0;

    this.uploadService
      .uploadContentLesson(
        this.courseService.courseDetail.code,
        this.courseService.moduleDetail.code,
        codeLesson,
        this.selectedFiles,
        this.selectedFiles.name
      )
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
           
            this.showMsgSucess();
          }
        },
        err => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.currentFile = undefined;
        }
      );
    this.selectedFiles = undefined;
  }
  showMsgSucess() {
    this.messagesService.success('Salvo com Sucesso', null);
  this.createLessonForm.reset();
 
    
  }

  
  
  saveNewLesson() {


    this.lessonService.saveLesson(this.lesson, this.idModule).subscribe(
      (newLesson: Lesson) => {
        if (this.selectedFiles != null) {
          this.upload(newLesson.code);
        }else{
         this.showMsgSucess();
        }

       
      },
      error => {
        this.messagesService.error(error.error, null);
        console.log(error);
      }
    );
    //
  }


  public getUrlImageCapa(id:number){
    return this.courseService.getUrlImageCapa(id);
  }
}





import { MessagesService } from 'src/app/services/messages.service';
import { UploadService } from './../../services/upload.service';
import { Lesson } from 'src/app/model/lesson';
import { LessonsService } from 'src/app/services/lessons.service';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { NavigationService } from 'src/app/services/navigation.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Module } from 'src/app/model/module';
import { Course } from 'src/app/model/course';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css'],
})
export class CreateLessonComponent implements OnInit {
  lesson: Lesson;
  module: Module;

  idModule: number;

  isEdit = false;
  isChangeFile = false;

  selectedFiles = null;
  currentFile: File;
  progress = 0;
  message = '';

  constructor(
    private fb: UntypedFormBuilder,
    public courseService: CourseService,
    public lessonService: LessonsService,
    public modulesService: ModulesService,
    public navigationService: NavigationService,
    public uploadService: UploadService,
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) {}

  createLessonForm: UntypedFormGroup = this.fb.group({
    id: ['', []],
    name: ['', [Validators.required, Validators.minLength(4)]],
    number: ['', [Validators.required, Validators.minLength(1)]],
    description: ['', [Validators.required, Validators.minLength(5)]],

    duration: [],
    dateRelease: [],
    contentFilePath: [],
    createdBy: [],
  });

  ngOnInit(): void {
    // check is editing...
    if (this.router.url.indexOf('edit') >= 0) {
      this.route.params.subscribe((params) => {
        var idLesson = Number.parseInt(params['idLesson']);
        this.lessonService.getLesson(idLesson).subscribe((data) => {
          this.lesson = data;

          this.createLessonForm.patchValue(this.lesson);
        });
      });

      this.isEdit = true;
    }

    this.route.params.subscribe((params) => {
      this.idModule = Number.parseInt(params['idModule']);
      this.modulesService
        .getSingleModule(this.idModule)
        .subscribe((m) => (this.module = m));
    });
  }

  createLesson() {
    Object.keys(this.createLessonForm.controls).forEach((field) => {
      const control = this.createLessonForm.get(field); // {2}
      control.markAsTouched({ onlySelf: true }); // {3}
    });

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

  upload(codeLesson: number): void {
    this.progress = 0;

    this.uploadService
      .uploadContentLesson(
        codeLesson,
        this.selectedFiles,
        this.selectedFiles.name
      )
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            console.log('uploaded done');
          }
        },
        (err) => {
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
          this.upload(newLesson.id);
        }
        this.navigationService.navigateToModuleList(this.module.idCourse);
        this.showMsgSucess();
      },
      (error) => {
        this.messagesService.error(error.error, null);
        console.log(error);
      }
    );
    //
  }

  public goToModulePage() {
    var idCourse = this.module.idCourse;
    this.router.navigateByUrl('/course/' + idCourse + '/modules');
  }

  isFieldValid(field: string) {
    return (
      !this.createLessonForm.get(field).valid &&
      this.createLessonForm.get(field).touched
    );
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }
}

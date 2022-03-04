import { MessagesService } from './../../services/messages.service';
import { CreateModulesComponent } from './../create-modules/create-modules.component';
import { CourseService } from 'src/app/services/course.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/model/course';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UploadService } from 'src/app/services/upload.service';
import { HttpEventType } from '@angular/common/http';
import { NavigationService } from 'src/app/services/navigation.service';
import { Module } from 'src/app/model/module';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  today: number = Date.now();
  course: Course;

  selectedFile = null;
  previewUrl: any = null;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    public courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadService,
    private messagesService: MessagesService,
    private navigationService: NavigationService
  ) {}

  createCourseForm: FormGroup = this.fb.group({
    id: ['', []],
    
    name: ['', [Validators.required, Validators.minLength(6)]],
    imageUrl: ['', ''],
    price: ['', [Validators.required, Validators.minLength(1)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    createdby: ['', [Validators.required, Validators.minLength(2)]],
    dateRelease: ['', [Validators.required, Validators.minLength(1)]],
    modules:[[],[]]
  });

  ngOnInit(): void {
    // check is editing...
    if (this.router.url.indexOf('edit') >= 0) {
      this.isEdit = true;
      this.createCourseForm.patchValue(history.state);
      this.previewUrl = this.courseService.getUrlImageCapa(this.courseService.courseDetail.id);
    }
  }

  createCourse() {
    if (!this.createCourseForm.valid) {
 
      console.log(this.createCourseForm.valid);
      return;
    }

    // Make sure to create a deep copy of the form-model
    this.course = Object.assign({}, this.createCourseForm.value);
    
    

    this.saveNewCourse();
    

    //this.uploadService.uploadImage(this.selectedFile);
  }
  saveNewCourse() {
    this.courseService.saveCourse(this.course).subscribe(
      (newHero: Course) => {
        if (this.selectedFile != null) {
          this.uploadService.uploadImage(newHero.code, this.selectedFile);
        }

        this.messagesService.success('Salvo com Sucesso', null);
      },
      error => {
        this.messagesService.error('Error > ' + error.error, null);
        console.log(error);
      }
    );
    this.navigationService.navigateToCourses();
  }
  saveEditCourse() {
    
      this.course.modules = [];
      this.courseService.courseDetail.modules.forEach(value => this.course.modules.push(value));



      

    this.courseService.updateCourse(this.course).subscribe(
      (newHero: Course) => {
        if (this.selectedFile != null) {
          this.uploadService.uploadImage(newHero.code, this.selectedFile);
        }

        this.messagesService.success('Salvo com Sucesso', null);
        this.navigationService.navigateToCourses();
      },
      error => {
        this.messagesService.error(error.error, null);
        console.log(error);
      }
    );
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = _event => {
      this.previewUrl = reader.result;
    };
  }
}

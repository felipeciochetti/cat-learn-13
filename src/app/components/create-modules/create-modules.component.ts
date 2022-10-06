import { NavigationService } from 'src/app/services/navigation.service';
import { UrlsService } from './../../services/urls.service';
import { MessagesService } from './../../services/messages.service';
import { ModulesService } from './../../services/modules.service';
import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, NgForm } from '@angular/forms';
import { Module } from 'src/app/model/module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-create-modules',
  templateUrl: './create-modules.component.html',
  styleUrls: ['./create-modules.component.css'],
})
export class CreateModulesComponent implements OnInit {
  module: Module;
  moduleList: Module[];

  isEdit: boolean = false;

  course: Course;

  constructor(
    private fb: UntypedFormBuilder,
    private moduleService: ModulesService,
    public courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private navigationService: NavigationService
  ) {}

  createModuleForm: UntypedFormGroup = this.fb.group({
    id: ['', []],

    name: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],

    duration: [],
    dateRelease: [],
    createdby: [],
    lessons: [[], []],
  });

  ngOnInit(): void {
    // check is editing...
    if (this.router.url.indexOf('edit') >= 0) {
      this.isEdit = true;

      this.route.params.subscribe((params) => {
        var idModule = Number.parseInt(params['idModule']);
        this.moduleService.getModule(idModule).subscribe((data) => {
          this.module = data;

          this.createModuleForm.patchValue(this.module);
        });
      });
    }

    this.route.params.subscribe((params) => {
      var idCourse = Number.parseInt(params['idCourse']);
      this.courseService.getCourse(idCourse).subscribe((data) => {
        this.course = data;
      });
    });
  }

  createModule() {
    Object.keys(this.createModuleForm.controls).forEach((field) => {
      const control = this.createModuleForm.get(field); // {2}
      control.markAsTouched({ onlySelf: true }); // {3}
    });

    if (!this.createModuleForm.valid) {
      return;
    }

    this.module = Object.assign({}, this.createModuleForm.value);

    this.saveModule();
  }
  saveModule() {
    this.moduleService.saveModule(this.module, this.course.id).subscribe(
      (newHero: Module) => {
        this.navigationService.navigateToModuleList(this.course.id);
        this.messagesService.success('Salvo com Sucesso', null);
      },
      (error) => {
        this.messagesService.error(error.error, null);
        console.log(error);
      }
    );
  }

  isFieldValid(field: string) {
    return (
      !this.createModuleForm.get(field).valid &&
      this.createModuleForm.get(field).touched
    );
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }

  public goToModulePage() {
    var idCourse = this.course.id;
    this.router.navigateByUrl('/course/' + idCourse + '/modules');
  }
}

import { NavigationService } from 'src/app/services/navigation.service';
import { UrlsService } from './../../services/urls.service';
import { MessagesService } from './../../services/messages.service';
import { ModulesService } from './../../services/modules.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Module } from 'src/app/model/module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-create-modules',
  templateUrl: './create-modules.component.html',
  styleUrls: ['./create-modules.component.css']
})
export class CreateModulesComponent implements OnInit {

  module: Module;
  moduleList: Module[];

  isEdit: boolean = false;

  course : Course;

  idCourse: number;

  constructor(
    private fb: FormBuilder,
    private moduleService: ModulesService,
    public courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private navigationService: NavigationService
  ) {}

  createModuleForm: FormGroup = this.fb.group({
    id: ['', []],
  
    name: ['', [Validators.required, Validators.minLength(4)]],
   
    number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    duration: ['', [Validators.required, Validators.minLength(1)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    dateRelease: [],
    createdby: [],
    lessons:[[],[]]
  });

  
    ngOnInit(): void {
      // check is editing...
      if (this.router.url.indexOf('edit') >= 0) {
        this.isEdit = true;
        this.createModuleForm.patchValue(history.state);
        
        
        this.route.params.subscribe(params => 
          this.idCourse = Number.parseInt(params['idCourse']));
      }else {
          
        this.course =  history.state;
        this.idCourse = this.course.id;

      } 
    
  
   }

  createModule() {
    if (!this.createModuleForm.valid) {
      return;
    }

    this.module = Object.assign({}, this.createModuleForm.value);


    

    this.saveModule();

    
  }
  saveModule() {
     this.moduleService.saveModule(this.module,this.idCourse).subscribe(
      (newHero: Module) => {
        
        this.messagesService.success('Salvo com Sucesso', null);
      },
      error => {
        this.messagesService.error(error.error, null);
        console.log(error);
      }
    );
    this.navigationService.navigateToCourses();


  }

  
  
  public getUrlImageCapa(id:number){
    return this.courseService.getUrlImageCapa(id);
  }
}

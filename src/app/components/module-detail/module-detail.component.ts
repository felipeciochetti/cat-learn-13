import { ModulesService } from './../../services/modules.service';
import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/model/module';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from 'src/app/services/messages.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css']
})
export class ModuleDetailComponent implements OnInit {
  
  constructor(
    public courseService: CourseService,
    public moduleService: ModulesService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    public dialog: MatDialog,
    public messageService: MessagesService
   ) {}

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

    course: Course = new Course();

    modules : Module[] = [];

    courseId : number;

  ngOnInit(): void {
    this.handleModuleDetails();
    
  }

  handleModuleDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    this.courseId = +this.route.snapshot.paramMap.get('idCourse');

    this.moduleService.getModuleList(this.courseId).subscribe(res => {
      this.modules = res;
      
    });
    this.courseService.getCourse(this.courseId).subscribe(res => {
      this.course = res;
     
    });
  }

  sortedModules(): Module[] {
    try{
 
      this.modules.sort((a,b) => a.number.localeCompare(b.number));
     }catch{
       
     }
     return this.modules;
 }
 


confirmDialogDelete(moduleId: number): void {
  const message = `Deseja deletar o Modulo?`;

  const dialogData = new ConfirmDialogModel('Confirmar', message);

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: '400px',
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    if (dialogResult) {
      this.deleteModule(moduleId);
      console.log('');
    }
  });

  
}


deleteModule(moduleId: number) {
  this.moduleService.deleteModule(this.courseId ,moduleId).subscribe(
    res => {
      this.messageService.success('Deletado com Sucesso', this.options);
      this.navigationService.navigateToCourses();
    },
    error => {
      this.messageService.error(error.error, this.options);
      console.log(error);
    }
  );
}


  
}
  
  

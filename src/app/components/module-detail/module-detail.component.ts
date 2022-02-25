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
  
  
  
  module: Module = new Module();
  course:Course;

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  
  
  constructor(
    public courseService: CourseService,
    public modulesService: ModulesService,
    public dialog: MatDialog,
    private navigationService: NavigationService,
    public messageService: MessagesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleModuleDetails();
    });

    this.course =  history.state;
  }

  handleModuleDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theCourseId: number = +this.route.snapshot.paramMap.get('idCourse');
    const theModuleId: number = +this.route.snapshot.paramMap.get('idModule');



    this.modulesService.getModule(theCourseId,theModuleId).subscribe(res => {
      this.module = res;
    });

    this.courseService.getCourse(theCourseId).subscribe(res => {
      this.course = res;
    });


  }

  confirmModuleDialogDelete(idModule:number): void {
    const message = `Deseja deletar o modulo?`;
  
    const dialogData = new ConfirmDialogModel('Confirmar', message);
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
  
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteModule(idModule);
        console.log('');
      }
    });
  }

  deleteModule(idModule:number) {
    this.modulesService.deleteModule(this.course.id,idModule).subscribe(
      res => {
        this.messageService.success('Deletado com Sucesso', this.options);
        this.navigationService.navigateToCourseDetail(this.course.id);
      },
      error => {
        this.messageService.error(error.error, this.options);
        console.log(error);
      }
    );
  }
  
  

  public getUrlImageCapa(id:number){
    return this.courseService.getUrlImageCapa(id);
  }
}

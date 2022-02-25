import { Lesson } from './../../model/lesson';
import { Course } from 'src/app/model/course';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { CreateModulesComponent } from '../create-modules/create-modules.component';
import { Data } from 'src/app/model/data';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationService } from 'src/app/services/navigation.service';
import { MessagesService } from 'src/app/services/messages.service';
import { CartService } from 'src/app/services/cart.service';
import { Module } from 'src/app/model/module';
import { CartItem } from 'src/app/model/cartItem';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component-teste.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  constructor(
    public courseService: CourseService,
    public moduleService: ModulesService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    public dialog: MatDialog,
    public messageService: MessagesService,
    public cartService: CartService,
  ) {}

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

    course : Course = new Course();

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theCourseId: number = +this.route.snapshot.paramMap.get('id');

    this.courseService.getCourse(theCourseId).subscribe(res => {
      this.course = res;
    });
  }

  sortedModules(): Module[] {
    try{
 
      this.course.modules.sort((a,b) => a.number.localeCompare(b.number));
     }catch{
       
     }
     return this.course.modules;
 }
 

 addToCart(){

  const cartItem = new CartItem(this.courseService.courseDetail);

  this.cartService.addToCart(cartItem);
}


confirmDialogDelete(): void {
  const message = `Deseja deletar o curso?`;

  const dialogData = new ConfirmDialogModel('Confirmar', message);

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: '400px',
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    if (dialogResult) {
      this.deleteCourse();
      console.log('');
    }
  });
}


deleteCourse() {
  this.courseService.deleteCourse(this.course.id).subscribe(
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

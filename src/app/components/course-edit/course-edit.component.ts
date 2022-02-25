import { MessagesService } from 'src/app/services/messages.service';
import { Module } from './../../model/module';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateModulesComponent } from '../create-modules/create-modules.component';
import { NavigationService } from 'src/app/services/navigation.service';
import {
  ConfirmDialogModel,
  ConfirmDialogComponent
} from '../confirm-dialog/confirm-dialog.component';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/model/cartItem';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  constructor(
    public courseService: CourseService,
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

    course : Course ;

  ngOnInit(): void {
    this.course =  history.state;

  }

  
  updateCourse(): void{

  }

  

}

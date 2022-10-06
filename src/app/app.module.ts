import { ModuleEditComponent } from './components/module-edit/module-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { SearchToolbarComponent } from './components/search-toolbar/search-toolbar.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CreateModulesComponent } from './components/create-modules/create-modules.component';
import { CreateLessonComponent } from './components/create-lesson/create-lesson.component';
import { MessagesComponent } from './components/messages/messages.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { ModuleDetailComponent } from './components/module-detail/module-detail.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  MatNativeDateModule,
  MatRippleModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ToastComponent } from './components/toast/toast.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { VideoPlayComponent } from './components/video-play/video-play.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import {
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG,
} from '@okta/okta-angular';
import catLearnConfig from './config/cat-learn-config';
import { HomeComponent } from './components/home/home.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { CustomerCoursesComponent } from './components/customer-courses/customer-courses.component';
import { CustomerCoursesDetailsComponent } from './components/customer-courses-details/customer-courses-details.component';
import { OktaGroupGuard } from './components/guard/okta-group.guard';
import { CustomerCoursesListComponent } from './components/customer-courses-list/customer-courses-list.component';
import { CourseHandlerGuardModule } from './components/guard/course-handle-guard';

const oktaConfig = Object.assign(
  {
    onAuthRequired: (
      _oktaAuth: any,
      injector: { get: (arg0: typeof Router) => any }
    ) => {
      const router = injector.get(Router);

      // Redirect the user to your custom login page
      router.navigate(['/login']);
    },
  },
  catLearnConfig.oidc
);

const routes: Routes = [
  { path: 'new-course', component: CreateCourseComponent },
  { path: 'course/:idCourse/new-module', component: CreateModulesComponent },
  { path: 'module/:idModule/new-lesson', component: CreateLessonComponent },

  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'courses/:idCourse/edit-course', component: CreateCourseComponent },

  {
    path: 'courses/:idCourse/edit-module/:idModule',
    component: CreateModulesComponent,
  },

  {
    path: 'module/:idModule/edit-lesson/:idLesson',
    component: CreateLessonComponent,
    canActivate: [OktaAuthGuard],
  },

  {
    path: 'user/customer-course-details',
    component: CustomerCoursesListComponent,
    canActivate: [CourseHandlerGuardModule],
    data: { groups: 'admin' },
  },
  { path: 'visitor/courses', component: CourseListComponent },

  {
    path: 'course/:idCourse/modules',
    component: ModuleDetailComponent,
    canActivate: [CourseHandlerGuardModule],
  },
  {
    path: 'course/:idCourse',
    component: CourseDetailComponent,
  },

  { path: 'lesson/:idLesson', component: LessonComponent },

  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },

  { path: 'cart-details', component: CartDetailsComponent },

  { path: 'courses', component: CourseListComponent },
  { path: 'course/search/:name', component: CourseListComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses', pathMatch: 'full' },

  //USER = MEANS USER LOGADO

  // VISITOR = MEANS VISITOR
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CourseListComponent,
    CourseDetailComponent,
    LoginStatusComponent,
    LoginComponent,
    CreateCourseComponent,
    SearchToolbarComponent,
    CreateCourseComponent,
    CreateModulesComponent,
    CreateLessonComponent,
    MessagesComponent,
    CourseEditComponent,
    ModuleDetailComponent,
    ModuleEditComponent,
    LessonComponent,
    ConfirmDialogComponent,
    ToastComponent,
    VideoPlayComponent,
    CarouselComponent,
    CartStatusComponent,
    CartDetailsComponent,
    HomeComponent,
    FieldErrorDisplayComponent,
    CustomerCoursesComponent,
    CustomerCoursesDetailsComponent,
    CustomerCoursesListComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CurrencyMaskModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTooltipModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    FormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatExpansionModule,
    OktaAuthModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    OktaGroupGuard,
    CourseHandlerGuardModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

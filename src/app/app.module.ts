import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {UserComponent} from './user/user.component';
import {DepartmentComponent} from './department/department.component';
import {TeachersComponent} from './teachers/teachers.component';
import {StudentsComponent} from './students/students.component';
import {CoursesComponent} from './courses/courses.component';
import {SectionComponent} from './section/section.component';
import { TeachesComponent } from './teaches/teaches.component';
import { ExamComponent } from './exam/exam.component';
import { MarkexamComponent } from './markexam/markexam.component';
import { TeachersDetailComponent } from './teachers-detail/teachers-detail.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';
import { StudentsDetailComponent } from './students-detail/students-detail.component';
import { TakesComponent } from './takes/takes.component';
import { TeachesDetailComponent } from './teaches-detail/teaches-detail.component';
import { GiveexamComponent } from './giveexam/giveexam.component'

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        UserComponent,
        DepartmentComponent,
        TeachersComponent,
        StudentsComponent,
        CoursesComponent,
        SectionComponent,
        TeachesComponent ,
        ExamComponent ,
        MarkexamComponent ,
        TeachersDetailComponent,
        SectionDetailComponent,
        StudentsDetailComponent ,
        TakesComponent,
        TeachesDetailComponent,
        GiveexamComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

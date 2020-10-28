import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import {UserComponent} from './user/user.component';
import {DepartmentComponent} from './department/department.component';
import {TeachersComponent} from './teachers/teachers.component';
import {StudentsComponent} from './students/students.component';
import {CoursesComponent} from './courses/courses.component';
import {SectionComponent} from './section/section.component';
import {TeachesComponent} from './teaches/teaches.component';
import {TeachersDetailComponent} from './teachers-detail/teachers-detail.component';
import {SectionDetailComponent} from './section-detail/section-detail.component';
import {TakesComponent} from './takes/takes.component';
import {ExamComponent} from './exam/exam.component';
import {TeachesDetailComponent} from './teaches-detail/teaches-detail.component';
import {GiveexamComponent} from './giveexam/giveexam.component';
import {GivemarksComponent} from './givemarks/givemarks.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'departments', component: DepartmentComponent, canActivate: [AuthGuard]},
    { path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard]},
    { path: 'teachers/:id', component: TeachersDetailComponent, canActivate: [AuthGuard]},
    { path: 'students', component: StudentsComponent, canActivate: [AuthGuard]},
    { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard]},
    { path: 'section', component: SectionComponent, canActivate: [AuthGuard]},
    { path: 'section/:id', component: SectionDetailComponent, canActivate: [AuthGuard]},
    { path: 'teaches', component: TeachesComponent, canActivate: [AuthGuard]},
    { path: 'teaches/:id', component: TeachesDetailComponent, canActivate: [AuthGuard]},
    { path: 'enrolled', component: TakesComponent, canActivate: [AuthGuard]},
    { path: 'exam', component: ExamComponent, canActivate: [AuthGuard]},
    { path: 'giveexam', component: GiveexamComponent, canActivate: [AuthGuard]},
    { path: 'givemarks', component: GivemarksComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
// @ts-ignore
export class AppRoutingModule {}

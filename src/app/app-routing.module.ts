import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import {UserComponent} from '@app/user/user.component';
import {DepartmentComponent} from '@app/department';
import {TeachersComponent} from '@app/teachers';
import {StudentsComponent} from '@app/students/students.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'departments', component: DepartmentComponent, canActivate: [AuthGuard]},
    { path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard]},
    { path: 'students', component: StudentsComponent, canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
// @ts-ignore
export class AppRoutingModule {}

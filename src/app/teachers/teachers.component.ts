import { Component, OnInit } from '@angular/core';
import {Department, LoggedInUser, Teacher} from '../_models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeachersService} from '../_services/teachers.service';
import {AuthenticationService} from '../_services/authentication.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../_services/user.service';
import {DepartmentService} from '../_services/department.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  loading = false;
  teachers: Teacher[];
  currentUser:LoggedInUser;
  name: string;
  uids:Array<string>;
  deptNames:Array<string>;
  deptUrl = 'http://localhost:8000/api/department/';
  userUrl = 'http://localhost:8000/api/users/'
  submitUser: string;
  submitDept: string;
  submitted = false;
  teacherForm: FormGroup;

  constructor(private teacherService: TeachersService,
              private userService: UserService,
              private deptService: DepartmentService,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private http: HttpClient) {
    this.uids =[];
    this.deptNames =[];
    this.submitUser = this.userUrl;
    this.submitDept = this.deptUrl;
  }



  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name'];
    this.getTeachers();
    this.getUid();
    this.getDeptname();
    this.teacherForm = this.formBuilder.group({
      uid: ['',[Validators.required]],
      tid: ['',[Validators.required]],
      dept_name: ['',[Validators.required]],
      designation:['',[Validators.required]],
      salary:['',[Validators.required]],
    });
  }

  getUid(): void {
    this.userService.sendGetRequest().subscribe((data: any[]) => {
      //this.loading = false;
      console.log(data);
      data.forEach(e => {
        if(e.first_name!='admin')
          if(e.profile['user_type'] == 'T') {
            e.url = decodeURI(e.url.split(this.userUrl)[1]).split('/')[0];
            this.uids.push(e.url)
          }
      })

      // this.users = data;
      // console.log(this.users)
    })
  };

  getDeptname(): void {
    this.deptService.getDeptID().subscribe((data: any[]) => {
      //this.loading = false;
      console.log(data);
      data.forEach(e => {
        //e.dept_name = this.deptUrl+e.dept_name+'/';
        this.deptNames.push(decodeURI(e.dept_name))
      })
      // this.depts = data;
      // console.log(this.depts)
    })
  };

  getTeachers(): void {
    this.teacherService.sendGetRequest().subscribe((data: any[]) => {
      this.loading = false;
      console.log(data);
      data.forEach( d =>{
        d.dept_name = decodeURI(d.dept_name.split(this.deptUrl)[1]).split('/')[0];
        d.uid = decodeURI(d.uid.split(this.userUrl)[1]).split('/')[0];
      })
      this.teachers = data;
      console.log(this.teachers)
    })

  };

  get f() { return this.teacherForm.controls; }
  onSubmit() {

    // stop here if form is invalid
    if (this.teacherForm.invalid) {
      return;
    }

    this.submitUser = encodeURI(this.submitUser+this.f.uid.value+'/');
    this.submitDept = encodeURI(this.submitDept+this.f.dept_name.value+'/');
    this.teacherService.createTeacher(this.submitUser, this.f.tid.value, this.submitDept, this.f.designation.value, this.f.salary.value)
      .subscribe({
        next: (data: any[]) => {
          // get return url from route parameters or default to '/'
          console.log(data);
          this.submitted = true;
          this.teacherForm.reset();
        },
        error: error => {
          console.log(error);

        }
      });
  }


}

import { Component, OnInit } from '@angular/core';
import {Department, LoggedInUser, Teacher} from '@app/_models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeachersService} from '@app/_services/teachers.service';
import {AuthenticationService} from '@app/_services';
import {HttpClient} from '@angular/common/http';
import {UserService} from '@app/_services';
import {DepartmentService} from '@app/_services/department.service';

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
  deptUrl = 'http://localhost:8000/api/department/'
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
  }

  // "uid": null,
  // "tid": "",
  // "dept_name": null,
  // "designation": "",
  // "salary": null

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
          if(e.profile['user_type'] == 'T')
            this.uids.push(e.url)
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
        e.dept_name = this.deptUrl+e.dept_name+'/';
        this.deptNames.push(e.dept_name)
      })
      // this.depts = data;
      // console.log(this.depts)
    })
  };

  getTeachers(): void {
    this.teacherService.sendGetRequest().subscribe((data: any[]) => {
      this.loading = false;
      console.log(data);
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


    this.teacherService.createTeacher(this.f.uid.value, this.f.tid.value, this.f.dept_name.value, this.f.designation.value, this.f.salary.value)
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

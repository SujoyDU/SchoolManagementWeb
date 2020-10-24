import { Component, OnInit } from '@angular/core';
import {LoggedInUser, Student, Teacher} from '@app/_models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '@app/_services/student.service';
import {AuthenticationService, UserService} from '@app/_services';
import {DepartmentService} from '@app/_services/department.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  loading= false;
  students: Student[];
  currentUser:LoggedInUser;
  name: string;
  uids:Array<string>;
  deptNames:Array<string>;
  submitted = false;
  studentForm: FormGroup;
  deptUrl = 'http://localhost:8000/api/department/'
  constructor(private studentService: StudentService,
              private userService: UserService,
              private deptService: DepartmentService,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private http: HttpClient) {
    this.uids =[];
    this.deptNames =[];
  }

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name'];
    this.getStudents();
    this.getUid();
    this.getDeptname();
    this.studentForm = this.formBuilder.group({
      uid: ['',[Validators.required]],
      sid: ['',[Validators.required]],
      dept_name: ['',[Validators.required]],
    });
  }

  getUid(): void {
    this.userService.sendGetRequest().subscribe((data: any[]) => {
      //this.loading = false;
      console.log(data);
      data.forEach(e => {
        if(e.first_name!='admin')
          if(e.profile['user_type'] == 'S')
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

  getStudents(): void {
    this.studentService.sendGetRequest().subscribe((data: any[]) => {
      this.loading = false;
      console.log(data);
      this.students = data;
      console.log(this.students)
    })

  };

  get f() { return this.studentForm.controls; }
  onSubmit() {

    // stop here if form is invalid
    if (this.studentForm.invalid) {
      return;
    }


    this.studentService.createStudent(this.f.uid.value, this.f.sid.value, this.f.dept_name.value)
      .subscribe({
        next: (data: any[]) => {
          // get return url from route parameters or default to '/'
          console.log(data);
          this.submitted = true;
          this.studentForm.reset();
        },
        error: error => {
          console.log(error);
        }
      });
  }


}

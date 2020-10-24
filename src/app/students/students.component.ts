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
  userUrl = 'http://localhost:8000/api/users/'
  submitUser: string;
  submitDept: string;

  constructor(private studentService: StudentService,
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
          if(e.profile['user_type'] == 'S'){
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

  getStudents(): void {
    this.studentService.sendGetRequest().subscribe((data: any[]) => {
      this.loading = false;
      console.log(data);
      data.forEach( d =>{
        d.dept_name = decodeURI(d.dept_name.split(this.deptUrl)[1]).split('/')[0];
        d.uid = decodeURI(d.uid.split(this.userUrl)[1]).split('/')[0];
      })
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

    this.submitUser = encodeURI(this.submitUser+this.f.uid.value+'/');
    this.submitDept = encodeURI(this.submitDept+this.f.dept_name.value+'/');

    this.studentService.createStudent(this.submitUser, this.f.sid.value, this.submitDept)
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

import { Component, OnInit } from '@angular/core';
import {Course, Department, LoggedInUser, User} from '../_models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service';
import {HttpClient} from '@angular/common/http';
import {DepartmentService} from '../_services/department.service';
import {CourseService} from '../_services/course.service';

@Component({
  selector: 'app-department',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  loading = false;
  courses: Course[];
  currentUser:LoggedInUser;
  name: string;
  deptNames:Array<string>;
  submitted = false;
  courseForm: FormGroup;
  deptUrl = 'http://localhost:8000/api/department/';
  submitDept: string;

  constructor(private deptService: DepartmentService,
              private courseService: CourseService,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private http: HttpClient) {
    this.deptNames =[];
    this.submitDept = this.deptUrl;
  }


  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name'];
    this.getCourses();
    this.getDeptname();
    this.courseForm = this.formBuilder.group({
      course_id: ['',[Validators.required]],
      course_name: ['',[Validators.required]],
      dept_name: ['',[Validators.required]],
      credits: ['',[Validators.required]]
    });
  }

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


  getCourses(): void {
    this.courseService.sendGetRequest().subscribe((data: any[]) => {
      this.loading = false;
      console.log(data);
      data.forEach( d =>{
        d.dept_name = decodeURI(d.dept_name.split(this.deptUrl)[1]).split('/')[0];
      })
      this.courses = data;
      console.log(this.courses)
    })
  };
  get f() { return this.courseForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.courseForm.invalid) {
      return;
    }

    this.submitDept = encodeURI(this.submitDept+this.f.dept_name.value+'/');
    this.courseService.createCourse(this.f.course_id.value, this.f.course_name.value, this.submitDept, this.f.credits.value)
      .subscribe({
        next: (data: any[]) => {
          // get return url from route parameters or default to '/'
          console.log(data);
          this.submitted = true;
          this.courseForm.reset();
        },
        error: error => {
          console.log(error);

        }
      });
  }


}

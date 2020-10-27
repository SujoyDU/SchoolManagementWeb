import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {DepartmentService} from '../_services/department.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {TakesService} from '../_services/takes.service';
import {LoggedInUser, Section, Takes} from '../_models/user';
import {SectionService} from '../_services/section.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-takes',
  templateUrl: './takes.component.html',
  styleUrls: ['./takes.component.css']
})
export class TakesComponent implements OnInit {

  loading = false;
  currentUser:LoggedInUser;
  name: string;
  courseList: Takes[];
  toEnroll:Section[];
  enrolledSecId:string[];
  getAllData:any[];
  studentUrl = 'http://localhost:8000/api/student/';
  sectionUrl = 'http://localhost:8000/api/section/'
  sid:string;
  teachesForm: FormGroup;
  sections:Section[];
  submitted = false;

  constructor(
    private takesService: TakesService,
    private userService: UserService,
              private sectionService: SectionService,
              private deptService: DepartmentService,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private http: HttpClient) {
    this.courseList= [];
    this.toEnroll =[];
    this.enrolledSecId =[];
  }

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name'];
    this.getEnrolledCourses();
    this.teachesForm =  this.formBuilder.group( {
        url: ['',[Validators.required]],
      }
    )

    // this.getStudents();
    // this.getUid();
  }

  getEnrolledCourses() {
    this.takesService.sendGetRequest().subscribe( (data:any[]) => {
      this.loading = false;
      console.log(data);
      data.forEach( d => {
        d.sid = decodeURI(d.sid.split(this.studentUrl)[1]).split('/')[0];
        d.take_course = decodeURI(d.take_course.split(this.sectionUrl)[1]).split('/')[0];
        if(d.sid == d.current_user) {
          this.courseList.push(d);
          this.enrolledSecId.push(d.take_course);
        }
      })
      this.getAllData = data;
      this.sid = data[0].current_user;
      this.getSections();

    })
  }
  get f() { return this.teachesForm.controls; }
  getSections() {
    this.sectionService.sendGetRequest().subscribe((data:any[]) => {
      data.forEach( d=> {
        if(!this.enrolledSecId.includes(decodeURI(d.url.split(this.sectionUrl)[1]).split('/')[0])) {
          this.toEnroll.push(d);
        }

      })
      this.sections = data;
    })
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.teachesForm.invalid) {
      return;
    }
    this.takesService.createTakes('C',this.studentUrl+this.sid + '/', this.f.url.value)
      .subscribe({
        next: (data: any[]) => {
          // get return url from route parameters or default to '/'
          console.log(data);
          this.submitted = true;
          this.teachesForm.reset();

        },
        error: error => {
          console.log(error);

        }
      });
  }

}

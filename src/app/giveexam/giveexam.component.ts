import { Component, OnInit } from '@angular/core';
import {TakesService} from '../_services/takes.service';
import {UserService} from '../_services/user.service';
import {AuthenticationService} from '../_services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Exam, GiveExam, LoggedInUser, Takes} from '../_models/user';
import {GiveexamService} from '../_services/giveexam.service';
import {ExamService} from '../_services/exam.service';

@Component({
  selector: 'app-giveexam',
  templateUrl: './giveexam.component.html',
  styleUrls: ['./giveexam.component.css']
})
export class GiveexamComponent implements OnInit {
  // "url": "http://localhost:8000/api/giveexam/2/",
  // "current_user": "5556622",
  // "isFinished": true,
  // "stuexam": "http://localhost:8000/api/exam/2/",
  // "student": "http://localhost:8000/api/takes/3/"

  giveExamUrl = "http://localhost:8000/api/giveexam/";
  stuexamUrl = "http://localhost:8000/api/exam/";
  takesUrl = "http://localhost:8000/api/takes/";
  studentUrl = 'http://localhost:8000/api/student/';
  sectionUrl = 'http://localhost:8000/api/section/'
  giveexams:GiveExam[];
  exams:Exam[];
  examTakes:Takes[];
  loading = false;
  currentUser:LoggedInUser;
  name: string;
  courseList: Takes[];
  enrolledSecId:string[];
  examsAvailable:string[];
  giveExamSections:string[];
  sections:string[];
  sid: string;
  giveExamForm: FormGroup;
  submitted = false;
  stu_takes_url = '';
  constructor(
    private examService: ExamService,
    private giveexamService: GiveexamService,
    private takesService: TakesService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.courseList =[];
    this.enrolledSecId = [];
    this.giveexams = [];
    this.examsAvailable = [];
    this.exams = [];
    this.giveExamSections = [];
    this.examTakes =[];
    this.sections=[];
  }

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name'];
    this.getEnrolledCourses();
    this.giveExamForm =  this.formBuilder.group( {
        exam_url: ['',[Validators.required]],
        // takes_url: ['',[Validators.required]],
      }
    )
    //this.getExams();
    // this.getExams();
  }

  getExams() {
    this.loading=false;
    this.examService.sendGetRequest().subscribe((data:any[]) => {
      data.forEach( d=> {
        if (this.enrolledSecId.includes(d.section.toString())) {
          if(!this.giveExamSections.includes(d.section.toString())){
            // d.url = decodeURI(d.url.split(this.stuexamUrl)[1]).split('/')[0];
            // this.exams.push(d);
            for( let i=0; i<this.courseList.length; i++) {
              if(this.courseList[i]['section'] == d.section) {
                d.takes = this.courseList[i];
                // this.examTakes.push(this.courseList[i]);
              }
            }
            this.exams.push(d);
          }

        }
      })
      console.log("exams: ");
      console.log(this.exams);
      console.log(this.examTakes);
    })


  }
  get f() { return this.giveExamForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.giveExamForm.invalid) {
      return;
    }

    for(let i=0; i<this.exams.length; i++){
      if(this.exams[i]['url'] == this.f.exam_url.value) {
        this.stu_takes_url = this.exams[i]['takes']['url'];
      }
    }

    this.giveexamService.createGiveExam('true',this.f.exam_url.value, this.stu_takes_url)
      .subscribe({
        next: (data: any[]) => {
          // get return url from route parameters or default to '/'
          console.log(data);
          this.submitted = true;
          this.giveExamForm.reset();

        },
        error: error => {
          console.log(error);

        }
      });
  }

  getEnrolledCourses() {
    this.takesService.sendGetRequest().subscribe( (data:any[]) => {
      this.loading = false;
      console.log(data);
      this.sid = data[0].current_user;
      data.forEach( d => {
        d.sid = decodeURI(d.sid.split(this.studentUrl)[1]).split('/')[0];
        d.take_course = decodeURI(d.take_course.split(this.sectionUrl)[1]).split('/')[0];
        d.url = decodeURI(d.url.split(this.takesUrl)[1]).split('/')[0];
        if(d.sid == d.current_user) {
          this.courseList.push(d);
          this.enrolledSecId.push(d.url);
          this.sections.push(d.section)

        }
      })
      // this.getAllData = data;

      // this.getSections();
      this.getgiveExams();
      console.log("courses: ")
      console.log(this.courseList);
      console.log(this.enrolledSecId);
    })
  }

  getgiveExams() {
    this.giveexamService.sendGetRequest().subscribe((data:any) => {
      console.log(data);
      data.forEach( d => {
        if(this.enrolledSecId.includes(decodeURI(d.student.split(this.takesUrl)[1]).split('/')[0])) {
          d.url = decodeURI(d.url.split(this.giveExamUrl)[1]).split('/')[0];
          d.stuexam = decodeURI(d.stuexam.split(this.stuexamUrl)[1]).split('/')[0];
          d.student = decodeURI(d.student.split(this.takesUrl)[1]).split('/')[0];
          this.giveexams.push(d);
          this.giveExamSections.push(d.student);
        }
      })
      this.getExams();

    })

  }



}

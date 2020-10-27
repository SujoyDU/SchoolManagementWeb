import { Component, OnInit } from '@angular/core';
import {AuthenticationService, UserService} from '@app/_services';
import {TeachersService} from '@app/_services/teachers.service';
import {TeachesService} from '@app/_services/teaches.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Exam, LoggedInUser, Teaches} from '@app/_models';
import {ExamService} from '@app/_services/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  teachesUrl = 'http://localhost:8000/api/teaches/'
  teacherUrl = 'http://localhost:8000/api/instructor/'
  loading = false;
  exams:Exam[];
  teaches:Teaches[];
  currentUser:LoggedInUser;
  name:string;
  submitted = false;
  tid:string;
  examForm:FormGroup;

  constructor(
    private userService: UserService,
    private teachesService: TeachesService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private examService: ExamService,
  ) {
    this.exams = [];
    this.tid ='';
    this.teaches =[];
  }

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name'];
    this.examForm =  this.formBuilder.group( {
        exam_name: ['',[Validators.required]],
        url: ['',[Validators.required]]
      }
    )
    this.getExam();

  }
  get f() { return this.examForm.controls; }

  getTeaches() {
    this.teachesService.sendGetRequest().subscribe((data:any[]) => {
      data.forEach( d => {
        d.tid = decodeURI(d.tid.split(this.teacherUrl)[1]).split('/')[0];
        d.url = decodeURI(d.url.split(this.teachesUrl)[1]).split('/')[0];
        if(d.tid == d.current_user) {
          this.teaches.push(d);
        }
      })
    })
  }
  getExam() {
    this.loading=false;
    this.examService.sendGetRequest().subscribe((data:any[]) => {
      data.forEach( d=> {
        if (d.exam_assigner == d.current_user) {
          d.teacher = decodeURI(d.teacher.split(this.teachesUrl)[1]).split('/')[0];
          this.exams.push(d);
        }
      })
      this.tid = this.exams[0]['current_user'];
    })
    this.getTeaches();


    // this.tid = this.exams[0]['current_user'];
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.examForm.invalid) {
      return;
    }

    this.examService.createExam(this.f.exam_name.value,this.teachesUrl+this.f.url.value + '/', )
      .subscribe({
        next: (data: any[]) => {
          // get return url from route parameters or default to '/'
          console.log(data);
          this.submitted = true;
          this.examForm.reset();

        },
        error: error => {
          console.log(error);

        }
      });
  }






}

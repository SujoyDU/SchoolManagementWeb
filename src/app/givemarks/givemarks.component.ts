import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExamService} from '../_services/exam.service';
import {LoggedInUser, Mark, MarkExam} from '../_models/user';
import {GivemarksService} from '../_services/givemarks.service';
import {GiveexamService} from '../_services/giveexam.service';

@Component({
  selector: 'app-givemarks',
  templateUrl: './givemarks.component.html',
  styleUrls: ['./givemarks.component.css']
})
export class GivemarksComponent implements OnInit {
  loading = false;
  currentUser:LoggedInUser;
  name:string;
  markForm: FormGroup;
  tid:string;
  marks:Mark[];
  exams:MarkExam[];
  submitted =false;
  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private giveExam:GiveexamService,
              private markExam: GivemarksService
              ) {
    this.marks = [];
    this.exams =[];
    this.tid = '';
  }

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name'];
    this.markForm =  this.formBuilder.group( {
        marks: ['',[Validators.required]],
        exam_obj: ['',[Validators.required]]
      }
    )
    this.getMarks();
  }

  getMarks(){
    this.loading = false;
      this.markExam.sendGetRequest().subscribe( (data:any[]) => {
          this.tid = data[0].current_user;
          data.forEach( d=> {
          if (d.exam_assigner == d.current_user) {
            this.marks.push(d);
          }

        })
        this.getGivenExams();
      })

  }

  //find the courses
  //select one course
  //get exams for that course
  //grade the course.

  getGivenExams(){
    this.giveExam.sendGetRequest().subscribe((data:any) => {
      data.forEach( d => {
        if(d.exam_assigner == this.tid ){
          this.exams.push(d);

        }
      })
      console.log(this.exams)
    })
  }
  get f() { return this.markForm.controls; }
  onSubmit() {
    // stop here if form is invalid
    if (this.markForm.invalid) {
      return;
    }

    this.markExam.createGiveMarks(this.f.marks.value,this.f.exam_obj.value )
      .subscribe({
        next: (data: any[]) => {
          // get return url from route parameters or default to '/'
          console.log(data);
          this.submitted = true;
          this.markForm.reset();

        },
        error: error => {
          console.log(error);

        }
      });
  }




}

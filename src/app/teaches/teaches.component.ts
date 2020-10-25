import { Component, OnInit } from '@angular/core';
import {LoggedInUser, Section, Teacher, Teaches, TeachesDetail, User} from '@app/_models';
import {AuthenticationService, UserService} from '@app/_services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {TeachesService} from '@app/_services/teaches.service';
import {TeachersService} from '@app/_services/teachers.service';
import {SectionService} from '@app/_services/section.service';

@Component({
  selector: 'app-teaches',
  templateUrl: './teaches.component.html',
  styleUrls: ['./teaches.component.css']
})
export class TeachesComponent implements OnInit {

  loading = false;
  teaches: Teaches[];
  tid: string;
  teachesDetail:TeachesDetail[];
  td:TeachesDetail;
  currentUser:LoggedInUser;
  teacher_name:string;
  name: string;
  sections: Section[];
  teachesForm: FormGroup;
  submitted = false;

  teacherUrl = 'http://localhost:8000/api/instructor/'
  sectionUrl = 'http://localhost:8000/api/section/'
  userUrl = 'http://localhost:8000/api/section/'

  constructor(
    private userService: UserService,
    private teacherService: TeachersService,
    private teachesService: TeachesService,
    private authenticationService: AuthenticationService,
               private sectionService: SectionService,
               private formBuilder: FormBuilder,
               private http: HttpClient) {
    this.tid='';
    this.teachesDetail =[];


  }

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name'];
    this.getTeaches();
    this.getSections();

    // this.getUid();
    // this.getDeptname();
    this.teachesForm =  this.formBuilder.group( {
      url: ['',[Validators.required]],
      }
    )
  }
  getSections() {
    this.sectionService.sendGetRequest().subscribe((data:any[]) => {
        this.sections = data;
    })
  }
  get f() { return this.teachesForm.controls; }

  getTeaches(){
    this.teachesService.sendGetRequest().subscribe((data: any[]) => {
      this.loading = false;
      console.log(data);
      data.forEach( d =>{

        d.tid = decodeURI(d.tid.split(this.teacherUrl)[1]).split('/')[0];
        // this.td.teacherInfo.tid = d.tid;
        // this.getTeacherName(this.getTeacherUId(d.tid))
        // this.td.teacherInfo.full_name = this.teacher_name;
        // this.getTeacherUId(d.tid);
        // this.teachesDetail.push(this.td)
        d.teachcourse = decodeURI(d.teachcourse.split(this.sectionUrl)[1]).split('/')[0];

      })
      this.teaches= data;
      this.tid = this.teaches[0]['current_user'];
      console.log(this.teaches)
    })

  }

  onSubmit() {
    // stop here if form is invalid
    if (this.teachesForm.invalid) {
      return;
    }

    this.teachesService.createTeaches(this.teacherUrl+this.tid + '/', this.f.url.value)
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

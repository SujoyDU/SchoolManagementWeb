import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LoggedInUser, Teacher} from '@app/_models';
import {TeachersService} from '@app/_services/teachers.service';
import { Location } from '@angular/common';
import {AuthenticationService} from '@app/_services';
@Component({
  selector: 'app-teachers-detail',
  templateUrl: './teachers-detail.component.html',
  styleUrls: ['./teachers-detail.component.css']
})
export class TeachersDetailComponent implements OnInit {

  deptUrl = 'http://localhost:8000/api/department/';
  userUrl = 'http://localhost:8000/api/users/'
  teacher:Teacher;
  loading = false;
  currentUser: LoggedInUser;
  name: string;

  constructor(private route: ActivatedRoute,
              private teacherService: TeachersService,
              private location: Location,
              private authenticationService: AuthenticationService,) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name'];
    this.getTeacher();
  }
  getTeacher() {
    this.loading=false;
    const id = +this.route.snapshot.paramMap.get('id');
    this.teacherService.sendGetRequestbyId(id).subscribe((data:Teacher) => {
      data.dept_name = decodeURI(data.dept_name.split(this.deptUrl)[1]).split('/')[0];
      data.uid = decodeURI(data.uid.split(this.userUrl)[1]).split('/')[0];
      this.teacher = data;
    })
  }
  goBack(): void {
    this.location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Location} from '@angular/common';
import {AuthenticationService} from '../_services/authentication.service';
import {TeachesService} from '../_services/teaches.service';
import {LoggedInUser, Teacher, Teaches} from '../_models/user';

@Component({
  selector: 'app-teaches-detail',
  templateUrl: './teaches-detail.component.html',
  styleUrls: ['./teaches-detail.component.css']
})
export class TeachesDetailComponent implements OnInit {

  instructorUrl = "http://localhost:8000/api/instructor/"
  sectionUrl = "http://localhost:8000/api/section/"
  teach:Teaches;
  loading = false;
  currentUser: LoggedInUser;
  name: string;
  tid:string;
  constructor(private route: ActivatedRoute,
              private teachesService: TeachesService,
              private location: Location,
              private authenticationService: AuthenticationService,) { this.tid = '';}

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name'];
    this.getTeachesDetail();
  }

  getTeachesDetail() {
    this.loading=false;
    const id = +this.route.snapshot.paramMap.get('id');
    this.teachesService.sendGetRequestbyId(id).subscribe((data:Teaches) => {
      data.tid = decodeURI(data.tid.split(this.instructorUrl)[1]).split('/')[0];
      data.teachcourse = decodeURI(data.teachcourse.split(this.sectionUrl)[1]).split('/')[0];
      this.teach = data;
      this.tid = data['current_user'];
    })

  }
}

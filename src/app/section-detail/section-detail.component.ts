import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AuthenticationService} from '../_services/authentication.service';
import {LoggedInUser, Section} from '../_models/user';
import {SectionService} from '../_services/section.service';

@Component({
  selector: 'app-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.css']
})
export class SectionDetailComponent implements OnInit {
  loading = false;
  currentUser: LoggedInUser;
  name: string;
  section: Section
  constructor(private route: ActivatedRoute,
              private sectionService: SectionService,
              private location: Location,
              private authenticationService: AuthenticationService,) { }

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name'];
    this.getSection();
  }
  getSection() {
    this.loading=false;
    const id = +this.route.snapshot.paramMap.get('id');
    this.sectionService.sendGetRequestById(id).subscribe( (data:Section) => {
      this.section = data;
    })
  }
  goBack(): void {
    this.location.back();
  }

}

import {Component, OnInit} from '@angular/core';

import {UserService} from '../_services/user.service';
import {LoggedInUser} from '../_models/user';
import {AuthenticationService} from '../_services/authentication.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit{
    loading = false;
    users: any;
    currentUser:LoggedInUser;
    name: string;
    constructor(private userService: UserService, private authenticationService: AuthenticationService) { }


    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.name = this.currentUser.user['first_name']
    }

    getUsers(): void {
      this.userService.sendGetRequest().subscribe((data: any[]) => {
        this.loading = false;
        console.log(data);
        this.users = data;
      })
    };


}

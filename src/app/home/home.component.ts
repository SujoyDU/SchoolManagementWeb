import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';

import {LoggedInUser, User} from '@app/_models';
import {AuthenticationService, UserService} from '@app/_services';

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

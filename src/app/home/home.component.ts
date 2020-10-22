import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit{
    loading = false;
    users: any;

    constructor(private userService: UserService) { }


    ngOnInit() {
        this.loading = true;
        this.userService.sendGetRequest().subscribe((data: any[])=>{
          this.loading = false;
          console.log(data);
          this.users = data;
        });
      // this.getUsers();
        // this.userService.getAll().pipe(first()).subscribe(users => {
        //     this.loading = false;
        //     this.users = users;
        // });
    }

    // getUsers(): void {
    //   this.userService.getUsers()
    //     .subscribe(
    //       users => this.users = users);
    // }


}

import { Component, OnInit } from '@angular/core';
import {LoggedInUser, NewUser,User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {AuthenticationService} from '../_services/authentication.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loading = false;
  users: User[];
  currentUser:LoggedInUser;
  name: string;


  newUser:NewUser = {
    first_name: '',
    last_name:'',
    password:'',
    email:'',
    profile : {
      user_type : 'T',
      address : 'New York',
      title : 'Mr',
      city : 'New York',
      country : 'New York',
      dob : '10/07/1992',
      zip : '12345',
      photo : null
    }
  }
  submitted = false;
  userForm: FormGroup;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private http: HttpClient) {
    this.defaultUser();
  }

  defaultUser(){
    this.newUser.first_name= '';
    this.newUser.last_name='';
    this.newUser.password='';
    this.newUser.email='';
    this.newUser.profile.address = 'New York';
    this.newUser.profile.city = 'New York';
    this.newUser.profile.country = 'New York';
    this.newUser.profile.dob = '10/07/1992';
    this.newUser.profile.user_type = 'T';
    this.newUser.profile.title = 'Mr';
    this.newUser.profile.zip ='12345';

  }

  ngOnInit() {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name']
    this.getUsers()
    this.userForm = this.formBuilder.group({
      first_name: ['',[Validators.required]],
      last_name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
      profile: this.formBuilder.group( {
        address : ['',[Validators.required]],
        city :['',[Validators.required]],
        country: ['',[Validators.required]],
        dob: ['',[Validators.required]],
        user_type: ['',[Validators.required]],
        zip: ['',[Validators.required]]
        })
    });
  }

  get f() { return this.userForm.controls; }

  getUsers(): void {
    this.userService.sendGetRequest().subscribe((data: any[]) => {
      this.loading = false;
      console.log(data);
      this.users = data;
      console.log(this.users)
    })
  };

  saveNewUser(): void {
    const data = {
      email: this.newUser.email,
      first_name : this.newUser.first_name,
      last_name : this.newUser.last_name,
      password: this.newUser.password,
      profile: this.newUser.profile
    };


    // this.userService.createUser(data)
    //   .subscribe(
    //     response => {
    //       console.log(response);
    //       this.submitted = true;
    //     },
    //     error => {
    //       console.log(error);
    //     });
  }

  submitSucces(): void {
    this.submitted = false;
    this.defaultUser();
  }


  onSubmit() {

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }


    this.userService.createUser(this.f.first_name.value, this.f.last_name.value, this.f.email.value, this.f.password.value, this.f.profile.value)
      .subscribe({
        next: (data: any[]) => {
          // get return url from route parameters or default to '/'
          console.log(data);
          this.submitted = true;
          this.userForm.reset();
        },
        error: error => {
          console.log(error);

        }
      });
  }
  // onSubmit(){
  //   if(this.userForm.valid){
  //     // this.userService.createUser(this.userForm.value)
  //     //   .subscribe(
  //     //     response => {
  //     //       console.log(response);
  //     //       this.submitted = true;
  //     //     },
  //     //     error => {
  //     //       console.log(error);
  //     //     });
  //     this.http.post('http://localhost/api/users', this.userForm.value)
  //       .subscribe((response)=>{
  //         console.log('repsonse ',response);
  //       })
  //   }
  // }


}

import { Component, OnInit } from '@angular/core';
import {Department, LoggedInUser, User} from '../_models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service';
import {HttpClient} from '@angular/common/http';
import {DepartmentService} from '../_services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  loading = false;
  depts: Department[];
  currentUser:LoggedInUser;
  name: string;

  submitted = false;
  deptForm: FormGroup;

  constructor(private deptService: DepartmentService,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private http: HttpClient) {}


  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name'];
    this.getDepts();
    this.deptForm = this.formBuilder.group({
      dept_name: ['',[Validators.required]],
      budget: ['',[Validators.required]],
      building: ['',[Validators.required]],
      courses:[''],
      instructors:[''],
      deptstudents:['']
    });
  }

  getDepts(): void {
    this.deptService.sendGetRequest().subscribe((data: any[]) => {
      this.loading = false;
      console.log(data);
      this.depts = data;
      console.log(this.depts)
    })
  };
  get f() { return this.deptForm.controls; }

  onSubmit() {

    // stop here if form is invalid
    if (this.deptForm.invalid) {
      return;
    }


    this.deptService.createDepartment(this.f.dept_name.value, this.f.building.value, this.f.budget.value, this.f.courses.value, this.f.instructors.value,this.f.deptstudents.value)
      .subscribe({
        next: (data: any[]) => {
          // get return url from route parameters or default to '/'
          console.log(data);
          this.submitted = true;
          this.deptForm.reset();
        },
        error: error => {
          console.log(error);

        }
      });
  }


}

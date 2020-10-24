import { Component, OnInit } from '@angular/core';
import {Course, LoggedInUser, Section} from '@app/_models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '@app/_services/course.service';
import {AuthenticationService} from '@app/_services';
import {HttpClient} from '@angular/common/http';
import {SectionService} from '@app/_services/section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  loading = false;
  sections: Section[];
  currentUser:LoggedInUser;
  name: string;
  submitted = false;
  sectionForm: FormGroup;
  courseUrl = 'http://localhost:8000/api/course/';
  sectionUrl = 'http://localhost:8000/api/section/'
  submitCourse: string;
  courseIds:Array<string>;

  constructor(
    private sectionService: SectionService,
    private courseService: CourseService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private http: HttpClient) {

    this.sections =[];
    this.courseIds =[];
    this.submitCourse = '';

  }

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this.name = this.currentUser.user['first_name'];
    this.getSection();
    this.getCourseIds();
    this.sectionForm = this.formBuilder.group({
      sec_id: ['',[Validators.required]],
      semester: ['',[Validators.required]],
      year: ['',[Validators.required]],
      course_id: ['',[Validators.required]]
    });
  }

  getSection() {
    this.sectionService.sendGetRequest().subscribe((data: any[]) => {
      this.loading = false;
      console.log(data);
      data.forEach( d =>{
        d.url = decodeURI(d.url.split(this.sectionUrl)[1]).split('/')[0];
        d.course_id = decodeURI(d.course_id.split(this.courseUrl)[1]).split('/')[0];
        if (d.semester== 'Fa') d.semester = 'Fall';
        else if (d.semester == 'Wi') d.semester = 'Winter';
        else if (d.semester == 'Su') d.semester = 'Summer';
        else d.semester = 'Spring';
      })
      this.sections = data;
      console.log(this.sections)
    })

  }

  getCourseIds(){
    this.courseService.getCourseID().subscribe((data: any[]) => {
      //this.loading = false;
      console.log(data);
      data.forEach(e => {
        //e.dept_name = this.deptUrl+e.dept_name+'/';
        this.courseIds.push(decodeURI(e.course_id))
      })

    })
  }

  get f() { return this.sectionForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.sectionForm.invalid) {
      return;
    }
    this.submitCourse=this.courseUrl;
    this.submitCourse = encodeURI(this.submitCourse+this.f.course_id.value+'/');
    this.sectionService.createSection(this.f.sec_id.value, this.f.semester.value, this.f.year.value, this.submitCourse)
      .subscribe({
        next: (data: any[]) => {
          // get return url from route parameters or default to '/'
          console.log(data);
          this.submitted = true;
          this.sectionForm.reset();
        },
        error: error => {
          console.log(error);

        }
      });
  }



}

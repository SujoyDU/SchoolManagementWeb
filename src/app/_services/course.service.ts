import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../_services/message.service';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private  courseUrl = 'http://localhost:8000/api/course/';

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  public sendGetRequest(){
    return this.http.get(this.courseUrl);
  }

  createCourse(course_id:string, course_name: string, dept_name: string, credits:string) {
    return this.http.post<any>(this.courseUrl, { course_id, course_name, dept_name,credits })
      .pipe(map(response => {
        console.log(response);
        return response;
      }));

  }
  getCourseID(){
    return this.http.get<any>( this.courseUrl )
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}

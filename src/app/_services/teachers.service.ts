import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, Department } from '@app/_models';
import {Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '@app/_services/message.service';

@Injectable({ providedIn: 'root' })
export class TeachersService {
  private  teacherUrl = 'http://localhost:8000/api/instructor/';

  constructor(private http: HttpClient,
              private messageService: MessageService) { }



  public sendGetRequest(){
    return this.http.get(this.teacherUrl);
  }


  createTeacher(uid:string, tid: string, dept_name: string, designation:string, salary:string) {
    return this.http.post<any>(this.teacherUrl, { uid, tid,dept_name,designation,salary})
      .pipe(map(response => {
        // console.log(response);
        return response;
      }));
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

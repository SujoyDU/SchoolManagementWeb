import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, Department } from '@app/_models';
import {Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '@app/_services/message.service';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private  studentUrl = 'http://localhost:8000/api/student/';

  constructor(private http: HttpClient,
              private messageService: MessageService) { }


  public sendGetRequestbyId(id){
    return this.http.get(this.studentUrl+id+'/');
  }
  public sendGetRequest(){
    return this.http.get(this.studentUrl);
  }


  createStudent(uid:string, sid: string, dept_name: string) {
    return this.http.post<any>(this.studentUrl, { uid, sid,dept_name})
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

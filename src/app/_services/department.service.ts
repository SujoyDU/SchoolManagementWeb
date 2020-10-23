import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, Department } from '@app/_models';
import {Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '@app/_services/message.service';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private  deptUrl = 'http://localhost:8000/api/department/';

  constructor(private http: HttpClient,
              private messageService: MessageService) { }



  public sendGetRequest(){
    return this.http.get(this.deptUrl);
  }

  getDeptID(){
    return this.http.get<any>( this.deptUrl )
  }
  getUsers() {
    return this.http.get<any>( this.deptUrl )
      .pipe(map((res: Response) => res.json()));
  }

  createDepartment(dept_name:string, building: string, budget: string, courses:any, instructors:any, deptstudents:any) {
    return this.http.post<any>(this.deptUrl, { dept_name, building,budget })
      .pipe(map(response => {
        console.log(response);
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

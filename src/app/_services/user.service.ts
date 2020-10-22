import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, Department } from '@app/_models';
import {Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '@app/_services/message.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    private  usersUrl = 'http://localhost:8000/api/users/';
    // httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };
    constructor(private http: HttpClient,
                private messageService: MessageService) { }



  public sendGetRequest(){
    return this.http.get(this.usersUrl);
  }

    getUsers() {
      return this.http.get<any>( this.usersUrl )
        .pipe(map((res: Response) => res.json()));
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

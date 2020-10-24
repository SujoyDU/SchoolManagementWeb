import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '@app/_services/message.service';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private  sectionUrl = 'http://localhost:8000/api/section/';

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  public sendGetRequest(){
    return this.http.get(this.sectionUrl);
  }

  createSection(sec_id:string, semester: string, year: string, course_id:string) {
    return this.http.post<any>(this.sectionUrl, { sec_id, semester, year,course_id })
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

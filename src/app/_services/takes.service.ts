import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '@app/_services/message.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TakesService {
  private  takesUrl = 'http://localhost:8000/api/takes/';

  constructor(private http: HttpClient,
              private messageService: MessageService) { }


  public sendGetRequest(){
    return this.http.get(this.takesUrl);
  }
  createTakes(course_status:string,sid:string, take_course:string) {
    return this.http.post<any>(this.takesUrl, {course_status, sid,take_course})
      .pipe(map(response => {
        console.log(response);
        return response;
      }));

  }

}

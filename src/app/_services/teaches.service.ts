import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '@app/_services/message.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeachesService {
  private  teachesUrl = 'http://localhost:8000/api/teaches/';

  constructor(private http: HttpClient,
              private messageService: MessageService) { }


  public sendGetRequest(){
    return this.http.get(this.teachesUrl);
  }
  createTeaches(tid:string, teachcourse:string) {
    return this.http.post<any>(this.teachesUrl, { tid,teachcourse})
      .pipe(map(response => {
        console.log(response);
        return response;
      }));

  }
}

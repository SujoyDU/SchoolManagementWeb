import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../_services/message.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GiveexamService {
  private  giveexamUrl = 'http://localhost:8000/api/giveexam/';
  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  public sendGetRequest(){
    return this.http.get(this.giveexamUrl);

  }

  createGiveExam(isFinished:string,stuexam:string, student:string) {
    return this.http.post<any>(this.giveexamUrl, {isFinished, stuexam,student})
      .pipe(map(response => {
        console.log(response);
        return response;
      }));

  }


}

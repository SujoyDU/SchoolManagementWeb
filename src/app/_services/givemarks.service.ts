import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GivemarksService {
  private  markExamUrl = 'http://localhost:8000/api/markexam/';
  constructor(private http: HttpClient,
              private messageService: MessageService) { }


  public sendGetRequest(){
    return this.http.get(this.markExamUrl);
  }

  createGiveMarks(exam_marks:string, examobj:string) {
    return this.http.post<any>(this.markExamUrl, { exam_marks,examobj})
      .pipe(map(response => {
        console.log(response);
        return response;
      }));

  }
}

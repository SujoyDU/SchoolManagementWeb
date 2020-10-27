import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '@app/_services/message.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private  examUrl = 'http://localhost:8000/api/exam/';

  constructor(private http: HttpClient,
              private messageService: MessageService) { }


  public sendGetRequest(){
    return this.http.get(this.examUrl);
  }

  createExam(exam_name:string, teacher:string) {
    return this.http.post<any>(this.examUrl, { exam_name,teacher})
      .pipe(map(response => {
        console.log(response);
        return response;
      }));

  }
}

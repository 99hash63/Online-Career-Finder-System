import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

import { Interviews } from './interviews.model';
@Injectable({
  providedIn: 'root'
})
export class InterviewsService {

  selectedQuestion: Interviews = new Interviews();
  InterviewQuestion: Interviews[] = [];
  readonly baseURL = "http://localhost:5000/Interviews/add";

  readonly URL_getCommonInterviews = "http://localhost:5000/Interviews/displayci";

  readonly URL_getInterviewtips = "http://localhost:5000/Interviews/displayig";

  readonly URL_getQuestiopool = "http://localhost:5000/Interviews/displayuserqp";

  readonly URL_getsavedQuestions = "http://localhost:5000/Interviews/displaysq";

  constructor(private http: HttpClient) { }

  postInterview(In : Interviews){
    return this.http.post(this.baseURL,In)
  }

  getCommonInterviewList(){
    return this.http.get(this.URL_getCommonInterviews);
  }

  getInterviewGuidelineList(){
    return this.http.get(this.URL_getInterviewtips);
  }

  getQuestionpool(){
    return this.http.get(this.URL_getQuestiopool);
  }

  getsavedQuestions(){
    return this.http.get(this.URL_getsavedQuestions);
  }
}

import { Component, OnInit } from '@angular/core';

import {InterviewsService} from '../../shared/interviews.service';
import { Interviews } from 'src/app/shared/interviews.model';

@Component({
  selector: 'app-get-myquestionpool',
  templateUrl: './get-myquestionpool.component.html',
  styleUrls: ['./get-myquestionpool.component.css'],
  providers:[InterviewsService]
})
export class GetMyquestionpoolComponent implements OnInit {

  constructor(public questionpool : InterviewsService) { }
  searchtext: string ="";

  /*updateInterview ={
  JobTitle : "",
  QuestionType : "",
  Offer :  "",
  Question :"",
  Answer : ""
}*/

JobTitle : String = "";
QuestionType : String = "";
Offer : String = "";
Question : String = "";
Answer : String = "";

  ngOnInit(): void {
    this.refreshQuestionpool();
  }
  refreshQuestionpool() {
    this.questionpool.getQuestionpool().subscribe((res) => {
      this.questionpool.InterviewQuestion = res as Interviews[];
    });
  }

  
  //update question and answer
  onUpdate(In : Interviews){
    this.questionpool.selectedQuestion = In;
  }

  /*onEdit(interview){
    this.updateInterview = interview;
  }*/

}

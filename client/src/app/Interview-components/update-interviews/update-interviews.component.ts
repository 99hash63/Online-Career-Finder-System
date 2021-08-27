import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { InterviewsService } from 'src/app/shared/interviews.service';


@Component({
  selector: 'app-update-interviews',
  templateUrl: './update-interviews.component.html',
  styleUrls: ['./update-interviews.component.css']
})
export class UpdateInterviewsComponent implements OnInit {

  JobTitle : String = "";
  QuestionType : String = "";
  Offer : String = "";
  Question : String = "";
  Answer : String = "";
  constructor(private r : ActivatedRoute,private notification : NotificationsService,public interviewService : InterviewsService) { }

  ngOnInit(): void {
  }

  OnUpdateInterviews(){
    console.log(123);
  }

  OnSucess(message){
    this.notification.success('Success',message,{
      position:['bottom','right'],
      timeOut : 3000,
      animate : 'fade',
      showProgressBar : true
    })
  }

  OnError(message){
    this.notification.error('Error',message,{
      position:['bottom','right'],
      timeOut : 3500,
      animate : 'fade',
      showProgressBar : true
    })
  }
}

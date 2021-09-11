import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import { result } from 'lodash';

import { InterviewsService } from 'src/app/shared/interviews.service';
import { Interviews } from 'src/app/shared/interviews.model';


@Component({
  selector: 'app-update-interviews',
  templateUrl: './update-interviews.component.html',
  styleUrls: ['./update-interviews.component.css']
})
export class UpdateInterviewsComponent implements OnInit {

  

  /*JobTitle : String = "";
  QuestionType : String = "";
  Offer : String = "";
  Question : String = "";
  Answer : String = "";*/
  _id : String;
  selectedQuestion: Interviews = new Interviews();
  constructor(private r : ActivatedRoute,private notification : NotificationsService,public interviewService : InterviewsService) { }

  ngOnInit(): void {
    this._id = this.r.snapshot.params['_id'];
    this.interviewService.getCurrentData(this._id).subscribe(data=>{
      this.selectedQuestion = data;
    })
    //console.log(this.r.snapshot.params._id)
    //this.interviewService.getCurrentData(this.r.snapshot.params._id).subscribe((result)=>{
      //console.log(result)
      
    //})
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

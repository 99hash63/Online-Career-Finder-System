import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

  OnUpdateInterviews(){
    console.log(123);
  }
}

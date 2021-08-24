import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


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
  constructor(private r : ActivatedRoute) { }

  ngOnInit(): void {
  }

  OnUpdateInterviews(){
    console.log(123);
  }
}

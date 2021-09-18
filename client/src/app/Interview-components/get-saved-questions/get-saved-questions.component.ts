import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';

import {InterviewsService} from '../../shared/interviews.service';
import { Interviews } from 'src/app/shared/interviews.model';

@Component({
  selector: 'app-get-saved-questions',
  templateUrl: './get-saved-questions.component.html',
  styleUrls: ['./get-saved-questions.component.css'],
  providers:[InterviewsService]
})
export class GetSavedQuestionsComponent implements OnInit {

  constructor(public savedQuestions : InterviewsService,
    private r : ActivatedRoute,
    private router: Router) { }

  _id : string;
  SaveOp : any = "yes";
  S : any = "no";
  selectedQuestion: Interviews = new Interviews();

  ngOnInit(): void {
    this.refreshsavedQuestions();
  }

  //retrive all saved questions
  refreshsavedQuestions() {
    this.savedQuestions.getsavedQuestions().subscribe((res) => {
      this.savedQuestions.InterviewQuestion = res as Interviews[];
    });
  }

  unsave(_id:string){
    console.log(_id);
    console.log(this.S);
    this.savedQuestions.unsaveQuestion(_id,this.S).subscribe(res=>{
      console.log(res);
      this.refreshsavedQuestions();
    })
    
  }

}

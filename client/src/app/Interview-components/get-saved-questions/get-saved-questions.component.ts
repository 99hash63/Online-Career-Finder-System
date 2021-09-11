import { Component, OnInit } from '@angular/core';

import {InterviewsService} from '../../shared/interviews.service';
import { Interviews } from 'src/app/shared/interviews.model';

@Component({
  selector: 'app-get-saved-questions',
  templateUrl: './get-saved-questions.component.html',
  styleUrls: ['./get-saved-questions.component.css'],
  providers:[InterviewsService]
})
export class GetSavedQuestionsComponent implements OnInit {

  constructor(public savedQuestions : InterviewsService) { }

  ngOnInit(): void {
    this.refreshsavedQuestions();
  }

  //retrive all saved questions
  refreshsavedQuestions() {
    this.savedQuestions.getsavedQuestions().subscribe((res) => {
      this.savedQuestions.InterviewQuestion = res as Interviews[];
    });
  }

}

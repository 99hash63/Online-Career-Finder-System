import { Component, OnInit } from '@angular/core';

import {InterviewsService} from '../../shared/interviews.service';
import { Interviews } from 'src/app/shared/interviews.model';

@Component({
  selector: 'app-get-interview-guidlines',
  templateUrl: './get-interview-guidlines.component.html',
  styleUrls: ['./get-interview-guidlines.component.css'],
  providers: [InterviewsService]
})
export class GetInterviewGuidlinesComponent implements OnInit {

  constructor(public interviewS : InterviewsService) { }

  ngOnInit(): void {
    this.refreshCommonInterviews();
  }
  refreshCommonInterviews() {
    this.interviewS.getInterviewGuidelineList().subscribe((res) => {
      this.interviewS.InterviewQuestion = res as Interviews[];
    });
  }

}

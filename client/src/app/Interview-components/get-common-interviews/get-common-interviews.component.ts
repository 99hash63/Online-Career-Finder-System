import { Component, OnInit } from '@angular/core';

//import { InterviewsService } from 'src/app/shared/interviews.service';
import {InterviewsService} from '../../shared/interviews.service';
import { Interviews } from 'src/app/shared/interviews.model';

@Component({
  selector: 'app-get-common-interviews',
  templateUrl: './get-common-interviews.component.html',
  styleUrls: ['./get-common-interviews.component.css'],
  providers: [InterviewsService]
})
export class GetCommonInterviewsComponent implements OnInit {
  
  constructor(public is : InterviewsService) { }

  searchtext: string =""

  ngOnInit(): void {
    this.refreshCommonInterviews();
  }
  refreshCommonInterviews() {
    this.is.getCommonInterviewList().subscribe((res) => {
      this.is.InterviewQuestion = res as Interviews[];
    });
  }

}

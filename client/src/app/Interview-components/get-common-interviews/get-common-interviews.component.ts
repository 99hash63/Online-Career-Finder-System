import { Component, Input, OnInit } from '@angular/core';

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
  _id : string;
  selectedQuestion: Interviews = new Interviews();

  ngOnInit(): void {
    this.refreshCommonInterviews();
  }
  refreshCommonInterviews() {
    this.is.getCommonInterviewList().subscribe((res) => {
      this.is.InterviewQuestion = res as Interviews[];
    });
  }
  /*@Input()
  isActive: boolean;
  onClick(){
    this.isActive = !this.isActive;
  }*/
  @Input()
  isActivate:boolean;
  save(SaveOp : String){
    this.is.saveQuestion(this._id,this.selectedQuestion).subscribe(res=>{
      //this.is.selectedQuestion.SaveOp = 'yes';
      console.log(res);
    })
      
  }

  

}

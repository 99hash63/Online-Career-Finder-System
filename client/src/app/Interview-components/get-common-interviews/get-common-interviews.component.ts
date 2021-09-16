import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
  
  constructor(public is : InterviewsService, 
    private r : ActivatedRoute,
    private router: Router) { }

  searchtext: string =""
  _id : string;
  SaveOp : any = "yes";
  S : any = "no";
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

  save(_id:string){
    console.log(_id);
    console.log(this.SaveOp);
    this.is.saveQuestion(_id,this.SaveOp).subscribe(res=>{
      console.log(res);
    })
      
  }

  /*unsave(_id:string){
    console.log(_id);
    console.log(this.S);
    this.is.saveQuestion(_id,this.S).subscribe(res=>{
      console.log(res);
    })
      
  }*/

  

}

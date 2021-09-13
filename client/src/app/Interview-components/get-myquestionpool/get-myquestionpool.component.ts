import { Component, NgModule, OnInit } from '@angular/core';
import { NgbModalConfig,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import {InterviewsService} from '../../shared/interviews.service';
import { Interviews } from 'src/app/shared/interviews.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-get-myquestionpool',
  templateUrl: './get-myquestionpool.component.html',
  styleUrls: ['./get-myquestionpool.component.css'],
  providers:[InterviewsService]
})
export class GetMyquestionpoolComponent implements OnInit { 

  constructor(
    public questionpool : InterviewsService,
    private router :Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private r:ActivatedRoute,
    private notification: NotificationsService ) {

     // customize default values of modals used by this component tree
     config.backdrop = 'static';
     config.keyboard = false;
   }
    searchtext: string ="";

  JobTitle : String = "";
  QuestionType : String = "";
  Offer : String = "";
  Question : String = "";
  Answer : String = "";

  ngOnInit(): void {
    this.refreshQuestionpool();
  }
  refreshQuestionpool() {
    this.questionpool.getQuestionpool().subscribe((res) => {
      this.questionpool.InterviewQuestion = res as Interviews[];
    });
  }

  resetForm(form? : NgForm){
    if(form)
      form.reset;
    this.questionpool.selectedQuestion ={
      _id : "",
      JobTitle: "",
      QuestionType: "",
      Offer:  "",
      Question: "",
      Answer: "",
      User: "",
      SaveOp: ""
    }
  }

  onEdit(_id : string){
    this.router.navigate(['/modify' , _id])
  }

  open(content: any) {
    this.modalService.open(content, {
      backdrop: 'static',
    });
  }

  close(){
    this.modalService.dismissAll()
  }

  //delete question and answer deleteQuestion()
  Ondelete(_id : string){
    this.questionpool.deleteInterview(_id).subscribe( res =>{
      console.log(res);
      this.close();
      this.refreshQuestionpool();
    })
  }

  //Successful notification
  OnSucess(message){
    this.notification.success('Success',message,{
      position:['bottom','right'],
      timeOut : 15000,
      animate : 'fade',
      showProgressBar : true
    })
  }
  
}

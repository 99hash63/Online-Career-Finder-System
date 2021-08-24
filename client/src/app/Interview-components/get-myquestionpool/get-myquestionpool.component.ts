import { Component, NgModule, OnInit } from '@angular/core';
import { NgbModalConfig,NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {InterviewsService} from '../../shared/interviews.service';
import { Interviews } from 'src/app/shared/interviews.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-myquestionpool',
  templateUrl: './get-myquestionpool.component.html',
  styleUrls: ['./get-myquestionpool.component.css'],
  providers:[InterviewsService]
})
export class GetMyquestionpoolComponent implements OnInit {

  constructor(public questionpool : InterviewsService, private router :Router,config: NgbModalConfig, private modalService: NgbModal) {
     // customize default values of modals used by this component tree
     config.backdrop = 'static';
     config.keyboard = false;
   }
  searchtext: string ="";

  /*updateInterview ={
  JobTitle : "",
  QuestionType : "",
  Offer :  "",
  Question :"",
  Answer : ""
}*/

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
  
  //update question and answer
  onUpdate(form : NgForm){
    this.questionpool.putInterviews(form.value).subscribe((res)=>{
      this.resetForm(form);
    })
  }
  /*onEdit(In : Interviews) {
    this.questionpool.selectedQuestion = In;
  }*/

  onEdit(_id : string){
    this.router.navigate(['/modify' , _id])

  }

  onDelete(_id : string){

  }

  open(content: any) {
    this.modalService.open(content, {
      backdrop: 'static',
    });
  }

  //delete question and answer
  /*onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }*/
}

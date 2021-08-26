import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

import { InterviewsService } from 'src/app/shared/interviews.service';

declare var M: any;

@Component({
  selector: 'app-add-interviews',
  templateUrl: './add-interviews.component.html',
  styleUrls: ['./add-interviews.component.css'],
  providers: [InterviewsService],
})
export class AddInterviewsComponent implements OnInit {
  constructor(
    public interviewService: InterviewsService,
    private notification: NotificationsService
  ) {}

  ngOnInit() {
    this.resetForm();
  }
  /*OnInsertInterviews(){
    console.log(123);
  }*/

  resetForm(form?: NgForm) {
    if (form) form.reset;
    this.interviewService.selectedQuestion = {
      _id: '',
      JobTitle: '',
      QuestionType: '',
      Offer: '',
      Question: '',
      Answer: '',
      User: '',
      SaveOp: '',
    };
  }

  OnSubmit(form: NgForm) {
    this.interviewService.postInterview(form.value).subscribe((res) => {
      this.resetForm(form);
      // M.toast({ html: 'send successfully', classes: 'rounded'});
      this.OnSucess('Successfully Inserted');
    });
  }

  OnSucess(message) {
    this.notification.success('Success', message, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
      showProgressBar: true,
    });
  }

  OnError(message) {
    this.notification.error('Error', message, {
      position: ['bottom', 'right'],
      timeOut: 3500,
      animate: 'fade',
      showProgressBar: true,
    });
  }
}

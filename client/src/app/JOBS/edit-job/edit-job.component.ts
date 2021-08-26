import { Component, OnInit } from '@angular/core';
import { JobpostService } from '../jobpost.service';
import { Jobpost } from '../jobpost.model';
import { FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css'],
  providers: [JobpostService],
})
export class EditJobComponent implements OnInit {
  exform!: FormGroup;
  constructor(public jobpostservice: JobpostService) {
    publishnow: true;
  }

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var CurrentDate = mm + '/' + dd + '/' + yyyy;

    form.value.publish = true;
    form.value.appliedApplicants = 0;
    form.value.createdDate = CurrentDate;

    this.jobpostservice.postJob(form.value).subscribe((res) => {});
  }
}

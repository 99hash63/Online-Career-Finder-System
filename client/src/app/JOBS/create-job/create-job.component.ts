import { Component, OnInit } from '@angular/core';
import { JobpostService } from '../jobpost.service';
import { Jobpost } from '../jobpost.model';
import { FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css'],
  providers: [JobpostService],
})
export class CreateJobComponent implements OnInit {
  exform!: FormGroup;

  constructor(public jobpostservice: JobpostService) {
    publishnow: true;
  }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.jobpostservice.selectedJob = {
      _id: null,
      title: null,
      company: null,
      location: null,
      industry: null,
      type: null,
      activelyHiring: null,
      salary: null,
      expectedApplicants: null,
      website: null,
      description: null,
      image: null,
      publish: null,
      appliedApplicants: null,
      createdDate: null,
    };
  }
  onSubmit(form: NgForm) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var CurrentDate = mm + '/' + dd + '/' + yyyy;

    form.value.publish = true;
    form.value.appliedApplicants = 0;
    form.value.createdDate = CurrentDate;

    this.jobpostservice.postJob(form.value).subscribe((res) => {
      this.resetForm();
    });
  }
}

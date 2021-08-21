import { Component, OnInit } from '@angular/core';
import { JobpostService } from '../jobpost.service';
import { Jobpost } from '../jobpost.model';
import {
  FormGroup,
  FormGroupDirective,
  NgForm,
  FormControl,
  Validators,
  PatternValidator,
} from '@angular/forms';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css'],
  providers: [JobpostService],
})
export class CreateJobComponent implements OnInit {
  exform!: FormGroup;
  // validate() {
  //   var form = document.getElementsByClassName(
  //     'needs-validation'
  //   )[0] as HTMLFormElement;
  //   if (form.checkValidity() === false) {
  //     event!.preventDefault();
  //     event!.stopPropagation();
  //   }
  //   form.classList.add('was-validated');
  // }

  constructor(public jobpostservice: JobpostService) {}

  ngOnInit(): void {
    this.resetForm();

    this.exform = new FormGroup({
      title: new FormControl(null, Validators.required),
      company: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      industry: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      activelyHiring: new FormControl(null, Validators.required),
      salary: new FormControl(null, Validators.required),
      expectedApplicants: new FormControl(null, Validators.required),
      website: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      publish: new FormControl(null, Validators.required),
      appliedApplicants: new FormControl(null, Validators.required),
      createdDate: new FormControl(null, Validators.required),
    });
  }

  resetForm(form?: any) {
    if (form) form.reset();
    this.jobpostservice.selectedJob = {
      _id: 'null',
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
  onSubmit(form: any) {
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

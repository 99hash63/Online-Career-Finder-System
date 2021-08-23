import { Component, OnInit } from '@angular/core';
import { JobpostService } from '../jobpost.service';
import { Jobpost } from '../jobpost.model';
import { RouterModule, Routes, Router } from '@angular/router';
import * as _ from 'lodash';
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
  publish?: boolean;
  imageError?: string;
  isImageSaved?: boolean;
  cardImageBase64?: string;
  // exform!: FormGroup;
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
    this.removeImage();

    // this.exform = new FormGroup({
    //   title: new FormControl('', Validators.required),
    //   company: new FormControl(null, Validators.required),
    //   location: new FormControl(null, Validators.required),
    //   industry: new FormControl(null, Validators.required),
    //   type: new FormControl(null, Validators.required),
    //   activelyHiring: new FormControl(null, Validators.required),
    //   salary: new FormControl(null, Validators.required),
    //   expectedApplicants: new FormControl(null, Validators.required),
    //   website: new FormControl(null, Validators.required),
    //   description: new FormControl(null, Validators.required),
    //   image: new FormControl(null, Validators.required),
    //   publish: new FormControl(null, Validators.required),
    //   appliedApplicants: new FormControl(null, Validators.required),
    //   createdDate: new FormControl(null, Validators.required),
    // });
  }

  resetForm(form?: NgForm) {
    if (form) form.reset;
    this.jobpostservice.selectedJob = {
      _id: '',
      title: '',
      company: '',
      location: '',
      industry: '',
      type: '',
      activelyHiring: '',
      salary: undefined,
      expectedApplicants: undefined,
      website: '',
      description: '',
      image: '',
      publish: undefined,
      appliedApplicants: undefined,
      createdDate: undefined,
    };
  }
  setPublish(value: boolean) {
    this.publish = value;
  }
  onSubmit(form: NgForm) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var CurrentDate = mm + '/' + dd + '/' + yyyy;

    form.value.publish = this.publish;
    form.value.appliedApplicants = 0;
    form.value.createdDate = CurrentDate;
    form.value.image = this.cardImageBase64;

    if (this.cardImageBase64 && !this.imageError) {
      this.jobpostservice.postJob(form.value).subscribe((res) => {
        this.resetForm(form);
        this.removeImage();
        window.location.href = '/myjobs';
      });
    }
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      // const max_height = 15200;
      // const max_width = 25600;
      const max_height = 1000;
      const max_width = 1000;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;

        image.onload = () => {
          const img_height = image.height;
          const img_width = image.width;

          console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
            return imgBase64Path;
          }
        };
        return 1;
      };

      reader.readAsDataURL(fileInput.target.files[0]);
      return 1;
    }
    return 1;
  }

  removeImage() {
    this.cardImageBase64 = '';
    this.imageError = '';
    this.isImageSaved = false;
  }
}

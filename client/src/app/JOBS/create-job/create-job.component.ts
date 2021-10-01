import { Component, OnInit, Input } from '@angular/core';
import { JobpostService } from '../jobpost.service';
import { Jobpost } from '../jobpost.model';
import { RouterModule, Routes, Router, RouterLink } from '@angular/router';
import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { IndustryOptions } from '../../../assets/industries';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import {
  FormGroup,
  FormBuilder,
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
  providers: [
    JobpostService,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true, displayDefaultIndicatorType: false },
    },
  ],
})
export class CreateJobComponent implements OnInit {
  //publish status
  publish?: boolean;

  public imageError?: string;

  isImageSaved?: boolean;

  cardImageBase64?: string;

  isLinear = false;

  //progress bar (show or hide) when create a job post
  progressBar = false;

  //initialized router
  router?: Router;

  //get industry data set to show in dropdown
  IndustryOptions = IndustryOptions;

  //form Groups
  jobForm!: FormGroup;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(
    public jobpostservice: JobpostService,
    private _formBuilder: FormBuilder,
    private first: FormBuilder,
    private second: FormBuilder,
    private third: FormBuilder,
    router: Router
  ) {
    this.router = router;
  }

  //web URL pattern for validations
  public myreg =
    /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/i;

  ngOnInit(): void {
    //remove image in image input and reset form on load
    this.resetForm();
    this.removeImage();

    //create form group 1
    (this.firstFormGroup = this.first.group({
      title: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      industry: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      activelyHiring: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      expectedApplicants: new FormControl('', [Validators.required]),
      website: new FormControl('', [
        Validators.required,
        Validators.pattern(this.myreg),
      ]),
    })),
      //create form group 2
      (this.secondFormGroup = this.second.group({
        description: new FormControl('', [Validators.required]),
      }));

    //create form group 3
    this.thirdFormGroup = this.third.group({
      image: new FormControl('', [Validators.required]),
    });
  }

  //image validation function
  validateImage(): ValidatorFn {
    return (control: AbstractControl): {} | null =>
      this.imageError!.length > 0 ? null : {};
  }

  //web URL validation function
  url = new FormControl('', [
    Validators.required,
    Validators.pattern(this.myreg),
  ]);

  //expect applicants validation function
  exApplicants = new FormControl('', [Validators.minLength(5)]);

  //salary input validation function
  salaryfn = new FormControl('', [Validators.minLength(10)]);

  markTouchedExApplicants() {
    this.exApplicants.markAsTouched();
    this.exApplicants.updateValueAndValidity();
  }
  markTouchedSalary() {
    this.salaryfn.markAsTouched();
    this.salaryfn.updateValueAndValidity();
  }
  markTouchedWebsite() {
    this.url.markAsTouched();
    this.url.updateValueAndValidity();
  }

  //reset form function
  resetForm() {
    this.progressBar = false;
    if (this.firstFormGroup) this.firstFormGroup.reset;
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

  //submit form function
  onSubmit() {
    this.progressBar = true;
    //build the form
    this.jobForm = this._formBuilder.group({
      title: this.firstFormGroup.value.title,
      company: this.firstFormGroup.value.company,
      location: this.firstFormGroup.value.location,
      industry: this.firstFormGroup.value.industry,
      type: this.firstFormGroup.value.type,
      activelyHiring: this.firstFormGroup.value.activelyHiring,
      salary: this.firstFormGroup.value.salary,
      expectedApplicants: this.firstFormGroup.value.expectedApplicants,
      description: this.secondFormGroup.value.description,
    });

    //get current date
    var today = new Date();
    var dd = String(today.getUTCDate()).padStart(2, '0');
    var mm = String(today.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getUTCFullYear();

    var CurrentDate = mm + '/' + dd + '/' + yyyy;

    //assign values
    this.jobForm.value.user = '1';
    this.jobForm.value.publish = this.publish;
    this.jobForm.value.appliedApplicants = 0;
    this.jobForm.value.createdDate = CurrentDate;
    this.jobForm.value.image = this.cardImageBase64;
    this.jobForm.value.website = this.url.value;

    //check inputs and errors
    if (
      this.cardImageBase64 &&
      !this.imageError &&
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid
    ) {
      this.jobpostservice.postJob(this.jobForm.value).subscribe((res) => {
        this.resetForm();
        this.removeImage();
        // window.location.href = '/createJob/success';
        Swal.fire('Done!', 'Your job post has been created.', 'success').then(
          (result) => {
            if (result.value) {
              this.router?.navigate(['/myjobs']);
            }
          }
        );
      });
    }
  }

  //convert image into base64 funtion
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

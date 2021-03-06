import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CompaniesService } from '../companies.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { result } from 'lodash';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CreateCompanyComponent implements OnInit {
  // industry = new FormControl();
  companyRegex =
    /^(http(s?):\/\/)?(www\.)+[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,3})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/;
  uploadImgUrl = '/assets/images/No_Preview_image.jpg';
  noImgUrl = '/assets/images/no-img.png';
  serverErrorMessages: string;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public companiesService: CompaniesService,
    private route: Router
  ) {}

  ngOnInit(): void {
    //binding all form groups to ts properties
    this.firstFormGroup = this._formBuilder.group({
      industry: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      emp_count: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      founded: ['', Validators.required],
      website: ['', Validators.required],
      revenue: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
    });
    this.sixthFormGroup = this._formBuilder.group({
      description: ['', Validators.required],
    });
    this.seventhFormGroup = this._formBuilder.group({
      testFile: [null, Validators.required],
    });
  }

  //uploading image
  uploadFile(event) {
    console.log('file selected');

    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.uploadImgUrl = e.target.result;
        this.noImgUrl = e.target.result;
      };
    }

    const file = (event.target as HTMLInputElement).files[0];
    this.seventhFormGroup.patchValue({
      testFile: file,
    });
    this.seventhFormGroup.get('testFile').updateValueAndValidity();
  }

  //on form submit
  onSubmit() {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid &&
      this.fourthFormGroup.valid &&
      this.fifthFormGroup.valid &&
      this.sixthFormGroup.valid &&
      this.seventhFormGroup.valid
    ) {
      const formData: any = new FormData();

      //getting all form data
      formData.append('industry', this.firstFormGroup.get('industry').value);
      formData.append('emp_count', this.secondFormGroup.get('emp_count').value);
      formData.append('founded', this.thirdFormGroup.get('founded').value);
      formData.append('website', this.thirdFormGroup.get('website').value);
      formData.append('revenue', this.thirdFormGroup.get('revenue').value);
      formData.append('country', this.fourthFormGroup.get('country').value);
      formData.append('city', this.fourthFormGroup.get('city').value);
      formData.append('title', this.fifthFormGroup.get('title').value);
      formData.append(
        'description',
        this.sixthFormGroup.get('description').value
      );
      formData.append('testFile', this.seventhFormGroup.get('testFile').value);

      //creating function to add company to the db
      this.companiesService.postCompany(formData).subscribe(
        (res) => {
          Swal.fire('Done!', 'Your post has been created.', 'success').then(
            (result) => {
              if (result.value) {
                this.route.navigateByUrl('myCompanies');
              }
            }
          );
        },
        (err) => {
          this.serverErrorMessages = err.error.join('<br/>');

          Swal.fire('Error!', this.serverErrorMessages, 'error');

          console.log(this.serverErrorMessages);
        }
      );
    }
  }

  //reset image when reset button is clicked
  resetImg() {
    this.uploadImgUrl = '/assets/images/No_Preview_image.jpg';
    this.noImgUrl = '/assets/images/no-img.png';
  }
}

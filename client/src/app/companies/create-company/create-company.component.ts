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
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public companiesService: CompaniesService
  ) {}

  ngOnInit(): void {
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
  }

  onSubmit() {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid &&
      this.fourthFormGroup.valid &&
      this.fifthFormGroup.valid &&
      this.sixthFormGroup.valid
    ) {
      const result = Object.assign(
        {},
        this.firstFormGroup.value,
        this.secondFormGroup.value,
        this.thirdFormGroup.value,
        this.fourthFormGroup.value,
        this.fifthFormGroup.value,
        this.sixthFormGroup.value
      );
      console.log(result);
      this.companiesService.postCompany(result).subscribe(
        (res) => {
          alert('success!');
        },
        (err) => {
          alert('error!');
          console.log(err);
        }
      );
    }
  }
}

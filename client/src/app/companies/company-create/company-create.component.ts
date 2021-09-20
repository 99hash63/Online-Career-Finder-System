import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from '../company.model';
import { CompaniesService } from '../companies.service';

declare var M: any;
@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css'],
})
export class CompanyCreateComponent {
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  // enteredTitle = '';
  // enteredDesc = '';
  isSucceess: string;

  constructor(public companiesService: CompaniesService) {}

  onAddCompany(form: NgForm) {
    this.companiesService.addCompany(form.value).subscribe(
      (res) => {
        this.showSuccessMessage = true;
        setTimeout(() => (this.showSuccessMessage = false), 3000);
        this.resetForm(form);
        // M.toast({ html: 'Saved successfully', classes: 'rounded' });
      },
      (err) => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else if (err.status === 500) {
          this.serverErrorMessages = 'User unauthorized!';
        } else {
          this.serverErrorMessages = 'Opps.. Something went wrong';
        }
      }
    );
  }

  resetForm(form: NgForm) {
    this.companiesService.selectedCompany = {
      _id: '',
      logo: '',
      coverPhoto: '',
      title: '',
      industry: '',
      emp_count: '',
      description: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}

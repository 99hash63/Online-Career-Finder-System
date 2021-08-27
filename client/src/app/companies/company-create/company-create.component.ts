import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from '../company.model';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css'],
})
export class CompanyCreateComponent {
  enteredTitle = '';
  enteredDesc = '';
  isSucceess: string = 'Error with creating company!';

  constructor(public companiesService: CompaniesService) {}

  onAddCompany(form: NgForm) {
    this.companiesService.addCompany(form.value).subscribe((res) => {
      console.log(res);
      if (res.success == true) {
        this.isSucceess = 'Company created successfully!';
      } else if (res.success == false) {
        this.isSucceess = 'Error with creating company!';
      }
    });
    alert(this.isSucceess);
    this.isSucceess = 'Error with creating company!';
  }
}

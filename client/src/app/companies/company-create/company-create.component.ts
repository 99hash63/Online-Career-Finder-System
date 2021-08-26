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

  constructor(public companiesService: CompaniesService) {}

  onAddCompany(form: NgForm) {
    const company: Company = {
      title: form.value.title,
      description: form.value.description,
    };
    this.companiesService.addCompany(company).subscribe((res) => {
      console.log(res);
    });
  }
}

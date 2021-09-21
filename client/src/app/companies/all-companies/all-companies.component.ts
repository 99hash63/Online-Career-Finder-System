import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { Company } from '../company.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css'],
})
export class AllCompaniesComponent implements OnInit {
  companies: Company[] = [];
  private companiesSub!: Subscription;

  constructor(public companiesService: CompaniesService) {}

  ngOnInit() {
    //   this.companies = this.companiesService.getCompanies();
    //   this.companiesSub = this.companiesService
    //     .getCompanyUpdateListener()
    //     .subscribe((companies: Company[]) => {
    //       this.companies = companies;
    //     });
  }
}

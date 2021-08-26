import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompaniesService } from '../companies.service';
import { Company } from '../company.model';

@Component({
  selector: 'app-my-companies',
  templateUrl: './my-companies.component.html',
  styleUrls: ['./my-companies.component.css'],
})
export class MyCompaniesComponent implements OnInit, OnDestroy {
  companies: Company[] = [];
  private companiesSub!: Subscription;

  constructor(public companiesService: CompaniesService) {}

  ngOnInit() {
    this.companiesService.getMyCompaniesDB();

    this.companies = this.companiesService.getCompanies();
    this.companiesSub = this.companiesService
      .getCompanyUpdateListener()
      .subscribe((companies: Company[]) => {
        this.companies = companies;
      });
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
  }
}

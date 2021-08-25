import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { Company } from '../company.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css'],
})
export class AllCompaniesComponent implements OnInit, OnDestroy {
  // companies: Company[] = [
  //   {
  //     title: 'company 1',
  //     description:
  //       'A top rated software company in Sri Lanka A top rated software company in Sri Lanka  A top rated software company in Sri Lanka',
  //   },
  //   {
  //     title: 'company 2',
  //     description:
  //       'A top rated software company in Sri Lanka A top rated software company in Sri Lanka  A top rated software company in Sri Lanka',
  //   },
  //   {
  //     title: 'company 3',
  //     description:
  //       'A top rated software company in Sri Lanka A top rated software company in Sri Lanka  A top rated software company in Sri Lanka',
  //   },
  // ];

  companies: Company[] = [];
  private companiesSub!: Subscription;

  constructor(public companiesService: CompaniesService) {}

  ngOnInit() {
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

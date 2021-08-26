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
    this.companiesService.getMyCompaniesDB().subscribe((res) => {
      console.log(res);
      this.companies = res.data as Company[];
    });
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
  }
}

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
  serverErrorMessages: string;
  constructor(public companiesService: CompaniesService) {}

  ngOnInit() {
    this.companiesService.getAllCompaniesDB().subscribe(
      (res) => {
        this.companies = res['data'] as Company[];
      },
      (err) => {
        this.serverErrorMessages = err.error.join('<br/>');
      }
    );
  }

  viewCompany(id: any) {
    this.companiesService.setMyCompanyId(id);
  }
}

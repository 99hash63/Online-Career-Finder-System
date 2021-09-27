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
  title: string = '';
  industry: string = 'none';
  private companiesSub!: Subscription;
  serverErrorMessages: string;
  p: number = 1;
  constructor(public companiesService: CompaniesService) {}

  ngOnInit() {
    this.companiesService.getAllCompaniesDB().subscribe(
      (res) => {
        this.companies = res['data'] as Company[];
        this.Search();
      },
      (err) => {
        this.serverErrorMessages = err.error.join('<br/>');
      }
    );
  }

  viewCompany(id: any) {
    this.companiesService.setMyCompanyId(id);
  }

  Search() {
    let x: any;
    if (this.industry != 'none') {
      this.companies = this.companies.filter((res) => {
        //   return res.title
        //     .toLocaleLowerCase()
        //     .match(this.title.toLocaleLowerCase());

        x = res.industry.match(this.industry);
        return x;
      });
    }
    if (this.title != '') {
      this.companies = this.companies.filter((res) => {
        x = res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
        return x;
      });
    }
  }
}

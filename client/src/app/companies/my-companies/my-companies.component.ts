import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompaniesService } from '../companies.service';
import { Company } from '../company.model';

@Component({
  selector: 'app-my-companies',
  templateUrl: './my-companies.component.html',
  styleUrls: ['./my-companies.component.css'],
  providers: [CompaniesService],
})
export class MyCompaniesComponent implements OnInit {
  companies: Company[] = [];
  private companiesSub!: Subscription;
  serverErrorMessages: string;
  title: string = '';
  industry: string = 'none';

  constructor(public companiesService: CompaniesService) {}

  ngOnInit() {
    this.companiesService.getMyCompaniesDB().subscribe(
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

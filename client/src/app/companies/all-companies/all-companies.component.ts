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

  //Initalization of the all companies component
  //calls the method getAllCompaniesDB to get all companies from the database
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

  //This method will call setMyCompanyId method to redirect to the overview page of a selected company
  viewCompany(id: any) {
    this.companiesService.setMyCompanyId(id);
  }

  //This search function will handle both search by text and filter by industry functions
  Search() {
    let x: any;
    if (this.industry != 'none') {
      this.companies = this.companies.filter((res) => {
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

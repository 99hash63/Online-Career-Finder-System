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

  //Initalization of the my companies component
  //calls the method getMyCompaniesDB to get all companies of a specific user
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

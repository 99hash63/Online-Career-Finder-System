import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { MyCompanyOverviewModel } from '../company-overview.model';

@Component({
  selector: 'app-my-company-overview',
  templateUrl: './my-company-overview.component.html',
  styleUrls: ['./my-company-overview.component.css'],
})
export class MyCompanyOverviewComponent implements OnInit {
  public myCompany: MyCompanyOverviewModel[] = [];
  constructor(public companiesService: CompaniesService) {}

  ngOnInit(): void {
    this.myCompany =
      this.companiesService.getCompanyOverview() as MyCompanyOverviewModel[];
    Object.entries(this.myCompany).forEach(([key, value]) =>
      console.log(key + ':' + value)
    );
  }
}

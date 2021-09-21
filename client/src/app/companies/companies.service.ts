import { Injectable } from '@angular/core';
import { Company } from './company.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MyCompanyOverviewModel } from './company-overview.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  //object to create company
  selectedCompany: Company;
  serverErrorMessages: string;
  public companies: Company[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  // private myCompany: MyCompanyOverviewModel[] = [];
  private companiesUpdated = new Subject<Company[]>();
  // getCompanies() {
  //   return [...this.companies];
  // }

  // getCompanyUpdateListener() {
  //   return this.companiesUpdated.asObservable();
  // }

  addCompany(company: Company) {
    this.companies.push(company);
    this.companiesUpdated.next([...this.companies]);

    return this.http.post(environment.apiBaseUrl + '/companies', company);
  }

  getMyCompaniesDB() {
    return this.http.get(environment.apiBaseUrl + '/companies');
  }

  // getSingleCompany(_id: Object) {
  //   const newURL = environment.apiBaseUrl + '/companies/' + _id;
  //   this.http.get(newURL).subscribe(
  //     (res) => {
  //       this.myCompany = res['data'] as MyCompanyOverviewModel[];
  //     }
  //     // (err) => {
  //     //   this.serverErrorMessages = err.error.join('<br/>');
  //     // }
  //   );
  // }

  // getCompanyOverview() {
  //   return (this.myCompany as MyCompanyOverviewModel[]) || [];
  // }
}

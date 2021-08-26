import { Injectable } from '@angular/core';
import { Company } from './company.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CompanyResponse } from './company-response.model';
import { MyCompanyOverviewModel } from './company-overview.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  constructor(private http: HttpClient, private router: Router) {}

  private companies: Company[] = [];
  private myCompany: MyCompanyOverviewModel[] = [];
  private companiesUpdated = new Subject<Company[]>();
  readonly baseURL = 'http://localhost:5000/api/v1/companies';
  readonly getSingleURL = `http://localhost:5000/api/v1/companies/`;
  getCompanies() {
    return [...this.companies];
  }

  getCompanyUpdateListener() {
    return this.companiesUpdated.asObservable();
  }

  addCompany(company: Company) {
    this.companies.push(company);
    this.companiesUpdated.next([...this.companies]);

    return this.http.post<CompanyResponse>(this.baseURL, company);
  }

  getMyCompaniesDB() {
    const output = this.http.get<CompanyResponse>(this.baseURL);
    return output;
  }

  getSingleCompany(_id: Object) {
    const newURL = this.getSingleURL + _id;
    // console.log(newURL);
    this.http.get<CompanyResponse>(newURL).subscribe((res) => {
      this.myCompany = res.data as MyCompanyOverviewModel[];
      // console.log(this.myCompany);
      this.router.navigate(['myCompanyOverview']);
    });
  }

  getCompanyOverview() {
    return (this.myCompany as MyCompanyOverviewModel[]) || [];
  }
}

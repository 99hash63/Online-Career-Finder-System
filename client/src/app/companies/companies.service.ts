import { Injectable } from '@angular/core';
import { Company } from './company.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MyCompanyOverviewModel } from './company-overview.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  selectedCompany: Company = {
    _id: '',
    logo: '',
    coverPhoto: '',
    title: '',
    industry: '',
    emp_count: '',
    description: '',
  };
  constructor(private http: HttpClient, private router: Router) {}

  public companies: Company[] = [];
  private myCompany: MyCompanyOverviewModel[] = [];
  private companiesUpdated = new Subject<Company[]>();
  getCompanies() {
    return [...this.companies];
  }

  getCompanyUpdateListener() {
    return this.companiesUpdated.asObservable();
  }

  addCompany(company: Company) {
    this.companies.push(company);
    this.companiesUpdated.next([...this.companies]);

    return this.http.post(environment.apiBaseUrl + '/companies', company);
  }

  getMyCompaniesDB() {
    return this.http.get(environment.apiBaseUrl + '/companies');
  }

  getSingleCompany(_id: Object) {
    const newURL = environment.apiBaseUrl + '/companies/' + _id;
    // console.log(newURL);
    this.http.get(newURL).subscribe((res) => {
      this.myCompany = res['data'] as MyCompanyOverviewModel[];
      // console.log(this.myCompany);
      this.router.navigate(['myCompanyOverview']);
    });
  }

  getCompanyOverview() {
    return (this.myCompany as MyCompanyOverviewModel[]) || [];
  }
}

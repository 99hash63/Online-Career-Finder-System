import { Injectable } from '@angular/core';
import { Company } from './company.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  private companies: Company[] = [];
  private companiesUpdated = new Subject<Company[]>();
  readonly baseURL = 'http://localhost:5000/api/v1/auth/companies';

  getCompanies() {
    return [...this.companies];
  }

  getCompanyUpdateListener() {
    return this.companiesUpdated.asObservable();
  }

  constructor(private http: HttpClient) {}

  addCompany(company: Company) {
    // this.companies.push(company);
    // this.companiesUpdated.next([...this.companies]);
    console.log('post addCompany clicked');

    this.http.post(this.baseURL, company);
    console.log('after url  clicked');
  }
}

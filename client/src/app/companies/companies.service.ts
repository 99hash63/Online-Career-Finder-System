import { Injectable } from '@angular/core';
import { Company } from './company.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  constructor(private http: HttpClient) {}

  private companies: Company[] = [];
  private companiesUpdated = new Subject<Company[]>();
  readonly baseURL = 'http://localhost:5000/api/v1/companies';
  readonly getURL = 'http://localhost:5000/api/v1/companies';

  getCompanies() {
    return [...this.companies];
  }

  getCompanyUpdateListener() {
    return this.companiesUpdated.asObservable();
  }

  addCompany(company: Company) {
    this.companies.push(company);
    this.companiesUpdated.next([...this.companies]);
    console.log('post addCompany clicked');

    return this.http.post(this.baseURL, company);
  }

  getMyCompaniesDB() {
    return this.http.get(this.getURL);
  }
}

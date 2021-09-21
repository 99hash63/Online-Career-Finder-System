import { Injectable } from '@angular/core';
import { Company } from './company.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MyCompanyDetail } from './myCompanyDetail';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  //create company properties
  selectedCompany: Company;
  serverErrorMessages: string;
  public companies: Company[] = [];
  private companiesUpdated = new Subject<Company[]>();

  //view company detail properties
  myCompanyId: string;

  //property change component visibility
  myCompanyMode: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  //function to create new company
  addCompany(company: Company) {
    this.companies.push(company);
    this.companiesUpdated.next([...this.companies]);

    return this.http.post(environment.apiBaseUrl + '/companies', company);
  }

  //function to get all my companies
  getMyCompaniesDB() {
    return this.http.get(environment.apiBaseUrl + '/companies');
  }

  //setter for myCompanyId and change myCompany mode to true
  setMyCompanyId(id: string) {
    this.myCompanyId = id;
    this.myCompanyMode = true;
  }

  //getter for myCompanyId
  getMyCompanyId() {
    return this.myCompanyId;
  }

  //function to get a single company from DB
  getSingleCompanyDB(id: string) {
    return this.http.get(environment.apiBaseUrl + '/companies/' + id);
  }

  myCompanyModeOn() {
    this.myCompanyMode = true;
  }

  myCompanyModeOff() {
    this.myCompanyMode = false;
  }
}

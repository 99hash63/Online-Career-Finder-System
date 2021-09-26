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

  selectedCompany2: MyCompanyDetail = {
    _id: '',
    industry: '',
    emp_count: '',
    founded: '',
    website: '',
    revenue: 0,
    address: '',
    location: Object[''],
    country: '',
    city: '',
    title: '',
    description: '',
    logo: '',
    coverPhoto: '',
    otherPhotos: [''],
    isPublic: false,
    createdAt: '',
    createdBy: '',
    slug: '',
  };

  //view company detail properties
  myCompanyId: string;

  //property change component visibility
  public myCompanyMode: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  //function to create new company
  addCompany(company: Company) {
    this.companies.push(company);
    this.companiesUpdated.next([...this.companies]);

    return this.http.post(environment.apiBaseUrl + '/companies', company);
  }

  //new function to create new company
  postCompany(company: MyCompanyDetail) {
    return this.http.post(environment.apiBaseUrl + '/companies', company);
  }

  //function to get all  companies
  getAllCompaniesDB() {
    return this.http.get(environment.apiBaseUrl + '/companies');
  }

  //function to get all my companies
  getMyCompaniesDB() {
    return this.http.get(environment.apiBaseUrl + '/companies/my');
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

  //function to display my company detail
  myCompanyModeOn() {
    this.myCompanyMode = true;
  }

  //function to stop displaying my company detail
  myCompanyModeOff() {
    this.myCompanyMode = false;
  }

  //delete a company
  deleteCompany(id) {
    return this.http.delete(environment.apiBaseUrl + '/companies/' + id);
  }
}

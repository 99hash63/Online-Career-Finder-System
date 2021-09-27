import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyRating } from './company-rating.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyRatingsService {
  selectedRating: CompanyRating = {
    emp_state: '',
    job_title: '',
    name: '',
    comment: '',
    rate_cultureValue: '',
    rate_workLife: '',
    rate_seniorManagement: '',
    companyId: '',
  };
  constructor(public http: HttpClient) {}

  //function to add rating
  postRating(rating: CompanyRating) {
    return this.http.post(environment.apiBaseUrl + '/companyReviews', rating);
  }
}

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
    rate_cultureValue: null,
    rate_workLife: null,
    rate_seniorManagement: null,
    rate_overall: null,
    companyId: '',
  };
  constructor(public http: HttpClient) {}

  //function to add rating
  postRating(rating: CompanyRating) {
    console.log('rating- ' + rating);

    return this.http.post(environment.apiBaseUrl + '/companyReviews', rating);
  }

  //function to get ratings of a company
  getRatings(companyId: string) {
    // console.log('rating service - ' + companyId);
    return this.http.get(
      environment.apiBaseUrl + '/companyReviews/' + companyId
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CompanyRating } from '../company-rating.model';
import { CompanyRatingsService } from '../company-ratings.service';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'app-company-ratings-summary',
  templateUrl: './company-ratings-summary.component.html',
  styleUrls: ['./company-ratings-summary.component.css'],
})
export class CompanyRatingsSummaryComponent implements OnInit {
  companyRatings: CompanyRating[] = [];

  //properties for display summary
  public totalReviews: number;
  public ratingsOverall: number;
  public ratingsCnV: number;
  public ratingsWnL: number;
  public ratingsSM: number;

  constructor(
    public companyRatingsService: CompanyRatingsService,
    public companiesService: CompaniesService
  ) {}

  model = {
    companyId: '',
  };

  ngOnInit(): void {
    this.model.companyId = this.companiesService.getMyCompanyId();
    this.getRatings();
  }

  getRatings() {
    this.companyRatingsService.getRatings(this.model.companyId).subscribe(
      (res) => {
        this.companyRatings = res['data'] as CompanyRating[];
        this.calTotalReviews();
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  calTotalReviews() {
    let ratingsOverallTotal = 0;
    let ratingsCnVTotal = 0;
    let ratingsWnLTotal = 0;
    let ratingsSMTotal = 0;
    this.totalReviews = this.companyRatings.length;

    this.companyRatings.forEach((companyRating) => {
      ratingsOverallTotal += companyRating.rate_overall;
      ratingsCnVTotal += companyRating.rate_cultureValue;
      ratingsWnLTotal += companyRating.rate_workLife;
      ratingsSMTotal += companyRating.rate_seniorManagement;
    });

    this.ratingsOverall = ratingsOverallTotal / this.totalReviews;
    this.ratingsCnV = ratingsCnVTotal / this.totalReviews;
    this.ratingsWnL = ratingsWnLTotal / this.totalReviews;
    this.ratingsSM = ratingsSMTotal / this.totalReviews;
  }
}

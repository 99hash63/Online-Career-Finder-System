import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyRating } from '../company-rating.model';
import { CompanyRatingsService } from '../company-ratings.service';
import { CompaniesService } from '../companies.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-company-ratings-summary',
  templateUrl: './company-ratings-summary.component.html',
  styleUrls: ['./company-ratings-summary.component.css'],
})
export class CompanyRatingsSummaryComponent implements OnInit {
  companyRatings: CompanyRating[] = [];
  chart: any = [];
  //properties for display summary
  public totalReviews: number;
  public ratingsOverall: string;
  public ratingsCnV: string;
  public ratingsWnL: string;
  public ratingsSM: string;

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

    //create chart

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
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

    this.ratingsOverall = (ratingsOverallTotal / this.totalReviews).toFixed(2);
    this.ratingsCnV = (ratingsCnVTotal / this.totalReviews).toFixed(2);
    this.ratingsWnL = (ratingsWnLTotal / this.totalReviews).toFixed(2);
    this.ratingsSM = (ratingsSMTotal / this.totalReviews).toFixed(2);
  }
}

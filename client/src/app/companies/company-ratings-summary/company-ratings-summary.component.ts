import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyRating } from '../company-rating.model';
import { CompanyRatingsService } from '../company-ratings.service';
import { CompaniesService } from '../companies.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
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
    this.displayChart();
  }

  displayChart() {
    //create chart
    var myChart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: [
          'Ratings - Overall',
          'Culture & Values',
          'Work/Life Balance',
          'Senior Management',
        ],
        datasets: [
          {
            label: 'My First Dataset',
            data: [
              this.ratingsOverall,
              this.ratingsCnV,
              this.ratingsWnL,
              this.ratingsSM,
            ],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(54, 162, 235)',
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }
}

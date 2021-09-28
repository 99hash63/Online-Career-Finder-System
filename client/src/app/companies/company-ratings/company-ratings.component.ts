import { Component, OnInit } from '@angular/core';
import { CompanyRating } from '../company-rating.model';
import { CompanyRatingsService } from '../company-ratings.service';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgbModal,
  NgbModalConfig,
  NgbPopover,
} from '@ng-bootstrap/ng-bootstrap';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'app-company-ratings',
  templateUrl: './company-ratings.component.html',
  styleUrls: ['./company-ratings.component.css'],
})
export class CompanyRatingsComponent implements OnInit {
  companyRatings: CompanyRating[] = [];

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
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}

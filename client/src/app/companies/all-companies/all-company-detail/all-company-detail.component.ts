import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgbModal,
  NgbModalConfig,
  NgbPopover,
} from '@ng-bootstrap/ng-bootstrap';
import { CompaniesService } from '../../companies.service';
import { CompanyRatingsService } from '../../company-ratings.service';
import { MyCompanyDetail } from '../../myCompanyDetail';

@Component({
  selector: 'app-all-company-detail',
  templateUrl: './all-company-detail.component.html',
  styleUrls: ['./all-company-detail.component.css'],
})
export class AllCompanyDetailComponent implements OnInit {
  public myCompanyId: string;
  public myCompanyDetail: MyCompanyDetail;
  public serverErrorMessages: string;
  public showSuccessMessage: boolean;
  public closePopup: boolean;
  @ViewChild('div') public popover: NgbPopover;

  constructor(
    public companiesService: CompaniesService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private router: Router,
    public companyRatingsService: CompanyRatingsService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    window.scroll(0, 0);

    this.myCompanyId = this.companiesService.getMyCompanyId();
    this.companiesService.getSingleCompanyDB(this.myCompanyId).subscribe(
      (res) => {
        this.myCompanyDetail = res['data'];
        console.log(this.myCompanyDetail);
      },
      (err) => {
        this.serverErrorMessages = err.error.join('<br/>');
      }
    );
  }
  //open conform delete alert box
  open(content: any) {
    this.modalService.open(content, {
      backdrop: 'static',
    });
  }

  //close conform delete alert box
  close() {
    this.modalService.dismissAll();
  }

  addReview(form: NgForm) {
    console.log(form.value);

    this.companyRatingsService.postRating(form.value).subscribe(
      (res) => {
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          document.getElementById('test').click();
        }, 2500);
        this.resetForm(form);
      },
      (err) => {
        this.serverErrorMessages = err.error.join('</br>');
      }
    );
  }

  resetForm(form: NgForm) {
    this.companyRatingsService.selectedRating = {
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
    // form.resetForm();
    this.serverErrorMessages = '';
  }
}

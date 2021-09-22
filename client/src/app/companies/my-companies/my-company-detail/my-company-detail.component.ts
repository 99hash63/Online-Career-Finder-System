import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CompaniesService } from '../../companies.service';
import { MyCompanyDetail } from '../../myCompanyDetail';

@Component({
  selector: 'app-my-company-detail',
  templateUrl: './my-company-detail.component.html',
  styleUrls: ['./my-company-detail.component.css'],
})
export class MyCompanyDetailComponent implements OnInit {
  public myCompanyId: string;
  public myCompanyDetail: MyCompanyDetail;
  public serverErrorMessages: string;
  public showSuccessMessage: boolean;
  constructor(
    public companiesService: CompaniesService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private router: Router
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

  onDelete() {
    this.companiesService.deleteCompany(this.myCompanyId).subscribe(
      (res) => {
        this.showSuccessMessage = true;

        // navigate and reload myCompanies component after deleting the company
        this.router.navigate(['/myCompanies']).then(() => {
          window.location.reload();
        });
      },
      (err) => {
        this.serverErrorMessages = err.error.join('<br/>');
      }
    );
  }
}

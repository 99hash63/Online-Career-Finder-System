import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CompaniesService } from '../../companies.service';
import { MyCompanyDetail } from '../../myCompanyDetail';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-company-detail',
  templateUrl: './my-company-detail.component.html',
  styleUrls: ['./my-company-detail.component.css'],
})
export class MyCompanyDetailComponent implements OnInit {
  public companyEditMode: boolean = false;
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this company post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your company post has been deleted.', 'success');

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
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your company post is safe :)', 'error');
      }
    });
  }

  companyEditModeOn() {
    this.companyEditMode = true;
  }
  companyEditModeOff() {
    this.companyEditMode = false;
  }
}

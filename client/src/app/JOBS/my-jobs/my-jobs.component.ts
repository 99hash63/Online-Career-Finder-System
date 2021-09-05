// import { Component, OnInit } from '@angular/core';
// import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// @Component({
//   selector: 'app-my-jobs',
//   templateUrl: './my-jobs.component.html',
//   styleUrls: ['./my-jobs.component.css'],
//   providers: [NgbModalConfig, NgbModal],
// })
// export class MyJobsComponent implements OnInit {
//   constructor(config: NgbModalConfig, private modalService: NgbModal) {
//     // customize default values of modals used by this component tree
//     config.backdrop = 'static';
//     config.keyboard = false;
//   }

//   ngOnInit(): void {}
//   open(content: any) {
//     this.modalService.open(content, {
//       backdrop: 'static',
//     });
//   }
// }

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { JobpostService } from '../jobpost.service';
import { Jobpost } from '../jobpost.model';
import { PageEvent } from '@angular/material/paginator';
import { IndustryOptions } from '../../../assets/industries';
import {
  FormGroup,
  FormBuilder,
  FormGroupDirective,
  NgForm,
  FormControl,
  Validators,
  PatternValidator,
} from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [JobpostService, NgbModalConfig, NgbModal],
})
export class MyJobsComponent implements OnInit {
  closeResult!: string;
  imageError?: string;
  isImageSaved?: boolean;
  cardImageBase64?: string;
  datediff?: number;
  searchTerm!: string;
  industry!: string;
  type: string = 'Type';
  _MS_PER_DAY = 1000 * 60 * 60 * 24;

  showJobPost: any = [];
  totalLength!: number;
  page!: number;
  // MatPaginator Output
  pageEvent!: PageEvent;

  pageSize: number = 10;

  JobType = new FormControl();
  typeList: string[] = ['All', 'Full Time', 'Part Time', 'Internship'];

  selectedTypes!: string;

  IndustryOptions = IndustryOptions;

  jobForm!: FormGroup;

  ujob!: string;

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.totalLength = event.length;
    console.log(this.page);
  }

  constructor(
    private modalService: NgbModal,
    public jobpostservice: JobpostService,
    private _formBuilder: FormBuilder,
    config: NgbModalConfig
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.refreshJobList();
  }
  setJob(job: Jobpost) {
    this.jobpostservice.selectedJob = job;
  }

  openScrollableContent(longContent: any) {
    this.modalService.open(longContent, {
      size: 'lg',
      backdrop: 'static',
      scrollable: true,
    });
  }
  refreshJobList() {
    this.jobpostservice.getalljobs().subscribe((res) => {
      this.jobpostservice.jobs = res as Jobpost[];
      this.showJobPost = res;
      this.totalLength = this.showJobPost.length;
      this.ujob = '';
    });
  }
  calcDateDiff(date: any) {
    var today = new Date();
    var s = new Date(date);

    var diff = Math.abs(today.getTime() - s.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays + 'd';
  }
  achiring() {
    if (this.jobpostservice.selectedJob.activelyHiring == 'Yes') {
      return true;
    }
    return false;
  }
  open(content: any) {
    this.modalService.open(content, {
      backdrop: 'static',
    });
  }
  updatePublish(id, con) {
    this.ujob = id;
    if (con == true) {
      this.jobForm = this._formBuilder.group({
        publish: false,
      });
      this.jobpostservice
        .updatePublish(id, this.jobForm.value)
        .subscribe((res) => {
          this.refreshJobList();
        });
    }
    if (con == false) {
      this.jobForm = this._formBuilder.group({
        publish: true,
      });
      this.jobpostservice
        .updatePublish(id, this.jobForm.value)
        .subscribe((res) => {
          this.refreshJobList();
        });
    }
  }
  loading() {
    return true;
  }
}

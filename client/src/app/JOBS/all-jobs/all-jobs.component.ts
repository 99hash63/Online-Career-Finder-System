import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobpostService } from '../jobpost.service';
import { Jobpost } from '../jobpost.model';
import { Applicant } from '../applicant.model';
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

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [JobpostService],
})
export class AllJobsComponent implements OnInit {
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

  applicantFormGroup!: FormGroup;

  applicant: Applicant = null;

  email;

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.totalLength = event.length;
    console.log(this.page);
  }

  constructor(
    private modalService: NgbModal,
    public jobpostservice: JobpostService,
    private first: FormBuilder
  ) {}

  ngOnInit(): void {
    this.refreshJobList();

    this.applicantFormGroup = this.first.group({
      aFullname: new FormControl('', [Validators.required]),
      aAddress: new FormControl('', [Validators.required]),
      aEmail: new FormControl('', [Validators.required, Validators.email]),
      aPhone: new FormControl('', [Validators.required]),
      aCV: new FormControl('', [Validators.required]),
      aResume: new FormControl('', [Validators.required]),
    });
  }
  // aEmail = new FormControl('', [Validators.required, Validators.email]);
  // getErrorMessage() {
  //   if (this.aEmail.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.aEmail.hasError('email') ? 'Not a valid email' : '';
  // }

  setJob(job: Jobpost) {
    this.jobpostservice.selectedJob = job;
  }
  setApplyJob(candidate: Applicant) {
    this.jobpostservice.applicant = candidate;
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
  downloadPDF() {
    console.log(this.jobpostservice.applicant);
  }
  SubmitApplication(jobID) {
    console.log('have fun' + jobID);
  }
}

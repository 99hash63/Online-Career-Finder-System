import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobpostService } from '../jobpost.service';
import { Jobpost } from '../jobpost.model';
import { Applicant } from '../applicant.model';
import { PageEvent } from '@angular/material/paginator';
import { IndustryOptions } from '../../../assets/industries';
import { RouterModule, Routes, Router, RouterLink } from '@angular/router';
import * as _ from 'lodash';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { pdftemp } from './pdftemp';
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
  //img to base64 convertion variables start
  closeResult!: string;

  imageError?: string;

  isImageSaved?: boolean;

  cardImageBase64?: string;
  //img to base64 convertion variables end

  //save PDF as base64
  pdfBase64: any;

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

  router?: Router;

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.totalLength = event.length;
    console.log(this.page);
  }

  constructor(
    private modalService: NgbModal,
    public jobpostservice: JobpostService,
    private first: FormBuilder,
    router: Router
  ) {
    this.router = router;
  }

  ngOnInit(): void {
    this.refreshJobList();

    this.applicantFormGroup = this.first.group({
      aFullname: new FormControl('', [Validators.required]),
      aAddress: new FormControl('', [Validators.required]),
      aEmail: new FormControl('', [Validators.required, Validators.email]),
      aPhone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),

      aCV: new FormControl('', [Validators.required]),

      aResume: new FormControl('', [Validators.required]),
    });
  }

  //set selected job post on display
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

  //date diffrent function
  calcDateDiff(date: any) {
    var today = new Date();
    var s = new Date(date);

    var diff = Math.abs(today.getTime() - s.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays + 'd';
  }
  //show actively hiring badge in job post
  achiring() {
    if (this.jobpostservice.selectedJob.activelyHiring == 'Yes') {
      return true;
    }
    return false;
  }
  //convert image into base64 funtion
  fileChangeEvent(evt: any) {
    var f = evt.target.files[0]; // FileList object
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = binaryData.toString();
        //showing file converted to base64
      };
    })(f);
    this.pdfBase64 = reader;
    // Read in the image file as a data URL.
    reader.readAsBinaryString(f);
  }

  //download PDF function
  downloadPDF() {
    //generate now date
    var today = new Date();
    var dd = String(today.getUTCDate()).padStart(2, '0');
    var mm = String(today.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getUTCFullYear();

    var CurrentDate = mm + '/' + dd + '/' + yyyy;
    //pdf filename for saving
    const filename =
      this.jobpostservice.selectedJob.company +
      '_' +
      this.jobpostservice.selectedJob.title +
      '_' +
      CurrentDate +
      '.pdf';

    if (this.applicantFormGroup.valid) {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [1000, 700],
      });
      doc.html(
        pdftemp(
          //get pdf tempalate
          this.jobpostservice.selectedJob.company,
          this.jobpostservice.selectedJob.title,
          this.applicantFormGroup.get('aFullname').value,
          this.applicantFormGroup.get('aAddress').value,
          this.applicantFormGroup.get('aEmail').value,
          this.applicantFormGroup.get('aPhone').value,
          this.applicantFormGroup.get('aCV').value
        ),
        {
          callback: function (doc) {
            //saving PDF
            doc.save(filename);
          },
          margin: 45,
        }
      );
    }
  }

  //update applicant count and navigate to success page
  SubmitApplication(jobID: any) {
    if (this.applicantFormGroup.valid) {
      this.jobpostservice
        .newApplicant(jobID, this.applicantFormGroup.value)
        .subscribe((res) => {
          this.router?.navigate(['/applied/success']);
        });
    }
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { JobpostService } from '../jobpost.service';
import { Jobpost } from '../jobpost.model';
import { PageEvent } from '@angular/material/paginator';
import { IndustryOptions } from '../../../assets/industries';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
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
  //img to base64 convertion variables start
  closeResult!: string;

  imageError?: string;

  isImageSaved?: boolean;

  cardImageBase64?: string;
  //img to base64 convertion variables end

  datediff?: number;

  //search terms start
  searchTerm!: string;

  industry!: string;

  typeList: string[] = ['All', 'Full Time', 'Part Time', 'Internship'];

  selectedTypes!: string;

  IndustryOptions = IndustryOptions;

  type: string = 'Type';

  _MS_PER_DAY = 1000 * 60 * 60 * 24;

  //search terms end

  //pagination variables start
  showJobPost: any = [];

  totalLength!: number;

  page!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;

  pageSize: number = 10;
  //pagination variables end

  JobType = new FormControl();

  jobForm!: FormGroup;

  ujob!: string;

  durationInSeconds = 5;

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
    config: NgbModalConfig,
    private _snackBar: MatSnackBar
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
    this.jobpostservice.getmyalljobs().subscribe((res) => {
      this.jobpostservice.jobs = res as Jobpost[];
      this.showJobPost = res;
      this.totalLength = this.showJobPost.length;
      this.ujob = '';
    });
  }

  //calculate date different
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
  //open model
  open(content: any) {
    this.modalService.open(content, {
      backdrop: 'static',
    });
  }

  //update publish status
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
  //loading funtion for inside btn progress bar
  loading() {
    return true;
  }
  //save job post for updating
  Edit(job: Jobpost) {
    this.jobpostservice.selectedJob = job;
  }

  //delete job post function
  deletePost() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this job post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobpostservice
          .deleteJobPost(this.jobpostservice.selectedJob._id)
          .subscribe((res) => {
            this.refreshJobList();
            this.jobpostservice.selectedJob = null;
          });

        Swal.fire('Deleted!', 'Your job post has been deleted.', 'success');
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your job post is safe :)', 'error');
      }
    });
  }
  //delete toast message
  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponentExample, {
      duration: this.durationInSeconds * 1000,
    });
  }
}

@Component({
  selector: 'snack-bar-component-example',
  templateUrl: 'snack-bar-component-example.html',
  styles: [
    `
      .jobpost-deleted {
        color: white;
        margin-left: 50px;
      }
    `,
  ],
})
export class SnackBarComponentExample {}

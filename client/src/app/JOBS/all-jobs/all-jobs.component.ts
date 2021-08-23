import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobpostService } from '../jobpost.service';
import { Jobpost } from '../jobpost.model';

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
  _MS_PER_DAY = 1000 * 60 * 60 * 24;

  constructor(
    private modalService: NgbModal,
    public jobpostservice: JobpostService
  ) {}

  ngOnInit(): void {
    this.refreshJobList();
    this.setJob(this.jobpostservice.jobs[0]);
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
    });
  }
  calcDateDiff(date: any) {
    var today = new Date();
    var s = new Date(date);
    // Discard the time and time-zone information.
    // const utc1 = Date.UTC(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate()
    // );
    // const utc2 = Date.UTC(
    //   date?.getFullYear() as number,
    //   date?.getMonth() as number,
    //   date?.getDate() as number
    // );
    // this.datediff = Math.floor((utc2 - utc1) / this._MS_PER_DAY);
    // console.log(Math.floor((utc2 - utc1) / this._MS_PER_DAY));

    // return Math.floor((utc2 - utc1) / this._MS_PER_DAY);
    var diff = Math.abs(today.getTime() - s.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays + 'd';
  }
}

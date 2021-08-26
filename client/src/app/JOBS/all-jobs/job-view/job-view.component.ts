import { Component, OnInit } from '@angular/core';
import { JobpostService } from '../../jobpost.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Jobpost } from '../../jobpost.model';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css'],
  providers: [JobpostService],
})
export class JobViewComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    public jobpostservice: JobpostService
  ) {}
  selected_job: any = this.jobpostservice.selectedJob;

  ngOnInit(): void {}

  openScrollableContent(longContent: any) {
    this.modalService.open(longContent, {
      size: 'lg',
      backdrop: 'static',
      scrollable: true,
    });
  }
}

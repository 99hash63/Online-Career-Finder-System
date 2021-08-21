import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AllJobsComponent implements OnInit {
  closeResult!: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openScrollableContent(longContent: any) {
    this.modalService.open(longContent, { scrollable: true });
  }
}

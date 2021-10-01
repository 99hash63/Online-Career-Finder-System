import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent implements OnInit {
  resumes: any;
  data: any;
  searchText;
  constructor(
    private resumeService: ResumeService // private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getResumesData();
  }

  getResumesData() {
    this.resumeService.getData().subscribe((res) => {
      console.log(res);
      this.resumes = res;
    });
  }

  deleteData(id) {
    this.resumeService.deleteData(id).subscribe((res) => {
      this.data = res;
      // this.toastr.error(
      //   JSON.stringify(this.data.code),
      //   JSON.stringify(this.data.message),
      //   {
      //     timeOut: 2000,
      //     progressBar: true,
      //   }
      // );
      alert('Resume Deleted');
      this.getResumesData();
    });
  }
}

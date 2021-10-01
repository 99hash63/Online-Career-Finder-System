import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this resume!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.resumeService.deleteData(id).subscribe((res) => {
          this.data = res;

          this.getResumesData();
        });

        Swal.fire('Deleted!', 'Your resume has been deleted.', 'success');
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your resume is safe :)', 'error');
      }
    });
  }
}

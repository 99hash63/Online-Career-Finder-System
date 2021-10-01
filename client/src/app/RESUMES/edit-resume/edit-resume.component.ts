import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ResumeService } from '../resume.service';
import { Resume } from '../model/resume.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-resume',
  templateUrl: './edit-resume.component.html',
  styleUrls: ['./edit-resume.component.css'],
})
export class EditResumeComponent implements OnInit {
  resume = new Resume();
  id: any;
  data: any;
  constructor(
    private resumeService: ResumeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    birth: new FormControl(''),
    gender: new FormControl(''),
    background: new FormControl(''),
    experience: new FormControl(''),
    technologies: new FormControl(''),
    education: new FormControl(''),
    projects: new FormControl(''),
    achievements: new FormControl(''),
    references: new FormControl(''),
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getData();
  }

  getData() {
    this.resumeService.getDataById(this.id).subscribe((res) => {
      this.data = res;
      this.resume = this.data;
      this.form = new FormGroup({
        name: new FormControl(this.resume.name),
        email: new FormControl(this.resume.email),
        contact: new FormControl(this.resume.contact),
        birth: new FormControl(this.resume.birth),
        gender: new FormControl(this.resume.gender),
        background: new FormControl(this.resume.background),
        experience: new FormControl(this.resume.experience),
        technologies: new FormControl(this.resume.technologies),
        education: new FormControl(this.resume.education),
        projects: new FormControl(this.resume.projects),
        achievements: new FormControl(this.resume.achievements),
        references: new FormControl(this.resume.references),
      });
    });
  }

  updateData() {
    Swal.fire('Done!', 'Your resume has been updated.', 'success').then(
      (result) => {
        if (result.value) {
          this.resumeService
            .updateData(this.id, this.form.value)
            .subscribe((res) => {
              this.data = res;

              this.router.navigateByUrl('/resume');
            });
        }
      }
    );
  }
}

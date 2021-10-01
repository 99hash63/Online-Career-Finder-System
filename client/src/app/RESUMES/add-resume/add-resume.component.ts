import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-resume',
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.css'],
})
export class AddResumeComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  data;
  constructor(
    private resumeService: ResumeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      birth: ['', Validators.required],
      gender: ['', Validators.required],
      background: ['', Validators.required],
      experience: ['', Validators.required],
      technologies: ['', Validators.required],
      education: ['', Validators.required],
      projects: ['', Validators.required],
      achievements: ['', Validators.required],
      references: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }
  insertData() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    Swal.fire('Done!', 'Your resume has been created.', 'success').then(
      (result) => {
        if (result.value) {
          this.resumeService.insertData(this.form.value).subscribe((res) => {
            this.data = res;

            this.router.navigateByUrl('/resume');
          });
        }
      }
    );
  }
}

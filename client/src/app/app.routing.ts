import { Router, RouterModule, Routes } from '@angular/router';
import { AllJobsComponent } from './JOBS/all-jobs/all-jobs.component';
import { ApplyJobsComponent } from './JOBS/apply-jobs/apply-jobs.component';
import { CreateJobComponent } from './JOBS/create-job/create-job.component';
import { EditJobComponent } from './JOBS/edit-job/edit-job.component';
import { MyJobsComponent } from './JOBS/my-jobs/my-jobs.component';

export const ROUTES: Routes = [
  {
    path: 'createJob',
    component: CreateJobComponent,
  },
  {
    path: 'jobs',
    component: AllJobsComponent,
  },
  {
    path: 'myjobs',
    component: MyJobsComponent,
  },
  {
    path: 'myjobs/editjobs',
    component: EditJobComponent,
  },
];

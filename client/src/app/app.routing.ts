import { Router, RouterModule, Routes } from '@angular/router';
import { AllJobsComponent } from './JOBS/all-jobs/all-jobs.component';
import { CreateJobComponent } from './JOBS/create-job/create-job.component';

export const ROUTES: Routes = [
  {
    path: 'createJob',
    component: CreateJobComponent,
  },
  {
    path: 'jobs',
    component: AllJobsComponent,
  },
];

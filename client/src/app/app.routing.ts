import { Router, RouterModule, Routes } from '@angular/router';
import { CreateJobComponent } from './JOBS/create-job/create-job.component';

export const ROUTES: Routes = [
  {
    path: 'createJob',
    component: CreateJobComponent,
  },
];

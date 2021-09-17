import { Router, RouterModule, Routes } from '@angular/router';
import { AllJobsComponent } from './JOBS/all-jobs/all-jobs.component';
import { AppliedSuccessComponent } from './JOBS/applied-success/applied-success.component';
import { ApplyJobsComponent } from './JOBS/apply-jobs/apply-jobs.component';
import { CreateJobComponent } from './JOBS/create-job/create-job.component';
import { EditJobComponent } from './JOBS/edit-job/edit-job.component';
import { MyJobsComponent } from './JOBS/my-jobs/my-jobs.component';
import { SuccessPageComponent } from './JOBS/success-page/success-page.component';
import { ProfileComponent } from './profile/profile.component';

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
    path: 'myjobs/editjobs/:id',
    component: EditJobComponent,
  },
  {
    path: 'createJob/success',
    component: SuccessPageComponent,
  },
  {
    path: 'applied/success',
    component: AppliedSuccessComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

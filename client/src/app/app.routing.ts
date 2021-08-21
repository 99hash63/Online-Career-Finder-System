import { Router, RouterModule, Routes } from '@angular/router';
import { CreateJobComponent } from './JOBS/create-job/create-job.component';

//Interview Handling
import { DiscoverhomeComponent } from './Interview-components/discoverhome/discoverhome.component';
import { AddInterviewsComponent } from './Interview-components/add-interviews/add-interviews.component';
import { NavbarComponent } from './Interview-components/navbar/navbar.component';
import { GetCommonInterviewsComponent } from './Interview-components/get-common-interviews/get-common-interviews.component';
import { GetInterviewGuidlinesComponent } from './Interview-components/get-interview-guidlines/get-interview-guidlines.component';
import { GetMyquestionpoolComponent } from './Interview-components/get-myquestionpool/get-myquestionpool.component';
import { GetSavedQuestionsComponent } from './Interview-components/get-saved-questions/get-saved-questions.component';
import { UpdateInterviewsComponent } from './Interview-components/update-interviews/update-interviews.component';

export const ROUTES: Routes = [
  {
    path: 'createJob',
    component: CreateJobComponent,
  },
];

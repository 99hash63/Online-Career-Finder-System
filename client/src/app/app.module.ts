import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxPaginationModule } from 'ngx-pagination';

import { ROUTES } from './app.routing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateJobComponent } from './JOBS/create-job/create-job.component';
import { AllJobsComponent } from './JOBS/all-jobs/all-jobs.component';
import { MyJobsComponent } from './JOBS/my-jobs/my-jobs.component';
import { ApplyJobsComponent } from './JOBS/apply-jobs/apply-jobs.component';
import { MatButtonModule } from '@angular/material/button';
import { EditJobComponent } from './JOBS/edit-job/edit-job.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DiscoverhomeComponent } from './Interview-components/discoverhome/discoverhome.component';
import { AddInterviewsComponent } from './Interview-components/add-interviews/add-interviews.component';
import { NavbarComponent } from './Interview-components/navbar/navbar.component';
import { GetCommonInterviewsComponent } from './Interview-components/get-common-interviews/get-common-interviews.component';
import { GetInterviewGuidlinesComponent } from './Interview-components/get-interview-guidlines/get-interview-guidlines.component';
import { GetMyquestionpoolComponent } from './Interview-components/get-myquestionpool/get-myquestionpool.component';
import { GetSavedQuestionsComponent } from './Interview-components/get-saved-questions/get-saved-questions.component';
import { UpdateInterviewsComponent } from './Interview-components/update-interviews/update-interviews.component';
import { pipe } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { JobViewComponent } from './JOBS/all-jobs/job-view/job-view.component';
import { SuccessPageComponent } from './JOBS/success-page/success-page.component';

import { CompanyCreateComponent } from './companies/company-create/company-create.component';
import { AllCompaniesComponent } from './companies/all-companies/all-companies.component';
import { CookieService } from 'ngx-cookie-service';
import { MyCompaniesComponent } from './companies/my-companies/my-companies.component';
import { MyCompanyOverviewComponent } from './companies/my-company-overview/my-company-overview.component';
import { NgxPrintModule } from 'ngx-print';
//create object from routes module

const appRoutes: Routes = [
  { path: 'discoverinterviews', component: DiscoverhomeComponent },
  { path: 'insert', component: AddInterviewsComponent },
  { path: 'getcommoninterviews', component: GetCommonInterviewsComponent },
  { path: 'getinterviewguidlines', component: GetInterviewGuidlinesComponent },
  { path: 'getmyquestionpool', component: GetMyquestionpoolComponent },
  { path: 'getsavedquestions', component: GetSavedQuestionsComponent },
  { path: 'modify/:_id', component: UpdateInterviewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'companyCreate', component: CompanyCreateComponent },
  { path: 'allCompanies', component: AllCompaniesComponent },
  { path: 'myCompanies', component: MyCompaniesComponent },
  { path: 'myCompanyOverview', component: MyCompanyOverviewComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CreateJobComponent,
    AllJobsComponent,
    MyJobsComponent,
    ApplyJobsComponent,
    EditJobComponent,
    DiscoverhomeComponent,
    AddInterviewsComponent,
    NavbarComponent,
    GetCommonInterviewsComponent,
    GetInterviewGuidlinesComponent,
    GetMyquestionpoolComponent,
    GetSavedQuestionsComponent,
    UpdateInterviewsComponent,
    LoginComponent,
    RegisterComponent,
    JobViewComponent,
    SuccessPageComponent,
    CompanyCreateComponent,
    AllCompaniesComponent,
    MyCompaniesComponent,
    MyCompanyOverviewComponent,
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    RouterModule.forRoot(ROUTES),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatPaginatorModule,
    NgbModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatStepperModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    Ng2SearchPipeModule,
    NgxPrintModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  exports: [NgxPaginationModule],
})
export class AppModule {}

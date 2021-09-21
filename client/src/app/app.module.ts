import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPrintModule } from 'ngx-print';
import { AuthInterceptor } from './auth/auth.interceptor';
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
import { NgxTypedJsModule } from 'ngx-typed-js';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
import { AuthGuard } from './auth/auth.guard';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { JobViewComponent } from './JOBS/all-jobs/job-view/job-view.component';
import { SuccessPageComponent } from './JOBS/success-page/success-page.component';
import { CookieService } from 'ngx-cookie-service';

import { CompanyCreateComponent } from './companies/company-create/company-create.component';
import { AllCompaniesComponent } from './companies/all-companies/all-companies.component';
import { MyCompaniesComponent } from './companies/my-companies/my-companies.component';

import { ProfileComponent } from './profile/profile.component';
import { AppliedSuccessComponent } from './JOBS/applied-success/applied-success.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { MyCompanyDetailComponent } from './companies/my-companies/my-company-detail/my-company-detail.component';
//create object from routes module

const appRoutes: Routes = [
  { path: 'discoverinterviews', component: DiscoverhomeComponent },
  { path: 'insert', component: AddInterviewsComponent },
  { path: 'getcommoninterviews', component: GetCommonInterviewsComponent },
  { path: 'getinterviewguidlines', component: GetInterviewGuidlinesComponent },
  { path: 'getmyquestionpool', component: GetMyquestionpoolComponent },
  { path: 'getsavedquestions', component: GetSavedQuestionsComponent },
  { path: 'modify/:_id', component: UpdateInterviewsComponent },
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
    JobViewComponent,
    SuccessPageComponent,
    CompanyCreateComponent,
    AllCompaniesComponent,
    MyCompaniesComponent,
    ProfileComponent,
    AppliedSuccessComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    MyCompanyDetailComponent,
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
    MatSnackBarModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatStepperModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    Ng2SearchPipeModule,
    NgxTypedJsModule,
    NgxPrintModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    CookieService,
    UserService,
  ],
  bootstrap: [AppComponent],
  exports: [NgxPaginationModule],
})
export class AppModule {}

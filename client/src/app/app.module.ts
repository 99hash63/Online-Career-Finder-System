import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ROUTES } from './app.routing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateJobComponent } from './JOBS/create-job/create-job.component';

//Interview Handling
//import { AppComponent } from './app.component';
import { DiscoverhomeComponent } from './Interview-components/discoverhome/discoverhome.component';
import { AddInterviewsComponent } from './Interview-components/add-interviews/add-interviews.component';
import { NavbarComponent } from './Interview-components/navbar/navbar.component';
import { GetCommonInterviewsComponent } from './Interview-components/get-common-interviews/get-common-interviews.component';
import { GetInterviewGuidlinesComponent } from './Interview-components/get-interview-guidlines/get-interview-guidlines.component';
import { GetMyquestionpoolComponent } from './Interview-components/get-myquestionpool/get-myquestionpool.component';
import { GetSavedQuestionsComponent } from './Interview-components/get-saved-questions/get-saved-questions.component';
import { UpdateInterviewsComponent } from './Interview-components/update-interviews/update-interviews.component';

//create object from routes module for InterviewHandling
const appRoutes: Routes =[
  {path:'discoverinterviews' ,component: DiscoverhomeComponent},
  {path:'insert' ,component: AddInterviewsComponent},
  {path:'getcommoninterviews' ,component: GetCommonInterviewsComponent},
  {path:'getinterviewguidlines' ,component: GetInterviewGuidlinesComponent},
  {path:'getmyquestionpool' ,component: GetMyquestionpoolComponent},
  {path:'getsavedquestions' ,component: GetSavedQuestionsComponent},
  {path:'modify' ,component: UpdateInterviewsComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CreateJobComponent,
    DiscoverhomeComponent,
    AddInterviewsComponent,
    NavbarComponent,
    GetCommonInterviewsComponent,
    GetInterviewGuidlinesComponent,
    GetMyquestionpoolComponent,
    GetSavedQuestionsComponent,
    UpdateInterviewsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

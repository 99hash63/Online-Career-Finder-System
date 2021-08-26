import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jobpost } from './jobpost.model';

@Injectable()
export class JobpostService {
  selectedJob!: Jobpost;
  jobs!: Jobpost[];
  readonly baseURLCJ = 'http://localhost:5000/findjobs/createjob';
  readonly baseURLGA = 'http://localhost:5000/findjobs/jobs';

  constructor(private http: HttpClient) {}
  postJob(job: Jobpost) {
    return this.http.post(this.baseURLCJ, job);
  }
  getalljobs() {
    return this.http.get(this.baseURLGA);
  }
}

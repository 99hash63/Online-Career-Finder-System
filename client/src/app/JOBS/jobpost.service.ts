import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Jobpost } from './jobpost.model';

@Injectable()
export class JobpostService {
  selectedJob!: Jobpost;
  jobs!: Jobpost[];
  readonly baseURL = '';

  constructor(private http: HttpClient) {}
  postJob(job: Jobpost) {
    return this.http.post(this.baseURL, job);
  }
}

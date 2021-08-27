import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/toPromise'

import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser!: User;
  user!: User[];
  readonly baseURL = 'http://localhost:5000/api/v1/auth/register';

  constructor(private http: HttpClient) {}

  postUser(user: User) {
    console.log('post user clicked');
    console.log(user);
    return this.http.post(this.baseURL, user);
  }
}

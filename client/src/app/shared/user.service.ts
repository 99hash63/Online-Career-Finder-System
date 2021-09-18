import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: User = {
    name: '',
    email: '',
    password: '',
  };
  constructor(public http: HttpClient) {}

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/auth/register', user);
  }
}
